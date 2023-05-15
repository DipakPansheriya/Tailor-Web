import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { ArticalRateInfo, Patterns } from 'src/app/interface/AuthResponse';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-pattern-master',
  templateUrl: './pattern-master.component.html',
  styleUrls: ['./pattern-master.component.scss']
})
export class PatternMasterComponent implements OnInit {
  isPatternVisible = false;
  isArticalRateVisible = false;
  patterns: any = [];
  patternPrice: any
  patternName: any
  patternCategory: any;
  patternId : any ;
  headingName = 'Add New Pattern';
  articalRateName = 'Add New Artical Rate';
  validPricePattern: RegExp = new RegExp(/^\d{0,10}$/g);
  validPatternName: RegExp = new RegExp(/^[a-zA-Z ]*$/g);
  articalTypeName :any
  articalRate :any
  articalRateInfoId :any
  articalRateInfoData :any

  constructor( 
    private fireBaseService: FirebaseService,
    private messageService : CustomMessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
  ) { }

  
  ngOnInit(): void {
    this.getAllPantPatterns();
  }
  
  getAllPantPatterns(): void {
    this.fireBaseService.getAllPatterns().subscribe((res => {
      if (res) {
        this.patterns = res;
      }
    }))

    this.fireBaseService.getAllArticalRateInfo().subscribe((res => {
      if (res) {
        this.articalRateInfoData = res;
      }
    }))
  }

  addNewPattern() : void {
    this.isPatternVisible = true;
    this.headingName = this.translate.instant('PATTERN_MASTER.ADD_NEW')
    this.articalRateName = 'Artical Rate Info'
    this.patternName = ''
    this.patternPrice = ''
    this.patternCategory = ''
    this.patternId = ''
  }
  addArticalRate() : void{
    this.articalTypeName = ''
    this.articalRate = ''
    this.isArticalRateVisible = true;
    
  }

  patternSubmit(): void {
    const payload: Patterns = {
      id: this.patternId ? this.patternId : '',
      patternName : this.patternName,
      patternPrice : Number(this.patternPrice),
      patternCategory : this.patternCategory,
    }

    if (!this.patternId) {
      this.fireBaseService.addPattern(payload).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.SubmitData') );
        this.isPatternVisible = false;
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    } else {
      debugger
      this.fireBaseService.updatePattern(this.patternId, payload ).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.UpdateData') );
        this.isPatternVisible = false;
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    }
  }

  articalRateInfoSubmit(): void {
    const payload: ArticalRateInfo = {
      id: this.articalRateInfoId ? this.articalRateInfoId : '',
      articalTypeName: this.articalTypeName,
      articalRate: this.articalRate
    }

    if (!this.articalRateInfoId) {
      this.fireBaseService.addArticalRateInfo(payload).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.SubmitData') );
        this.isArticalRateVisible = false;
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    } else {
      this.fireBaseService.updateArticalRateInfo(this.articalRateInfoId, payload ).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.UpdateData') );
        this.isArticalRateVisible = false;
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    }
  }



  editPattern(value: any): void {
    debugger
    this.headingName = this.translate.instant('PATTERN_MASTER.EDIT')
    this.isPatternVisible = true;
    this.patternId = value.id
    this.patternName = value.patternName
    this.patternPrice = value.patternPrice
    this.patternCategory = value.patternCategory
  }

  editArticalRateInfo(value: any): void {
    this.articalRateName = 'Edit Artical Rate';
    this.isArticalRateVisible = true;
    this.articalRateInfoId = value.id
    this.articalTypeName = value.articalTypeName
    this.articalRate = value.articalRate
  }

  isValid(): boolean {
    let result = false;
    if (this.patternName && this.patternPrice && this.patternCategory
    ) {
      result = true;
    } else {
      result = false;
    }
    return result
  }

  isArticalRateInfoValid(): boolean {
    let result = false;
    if (this.articalRateName && this.articalRate) {
      result = true;
    } else {
      result = false;
    }
    return result
  }

  inputRestriction(event: any, type: any): any {
    if (type === 'price') {
      this.messageService.inputRestriction(event, this.validPricePattern)
    } else {
      this.messageService.inputRestriction(event, this.validPatternName)
    }
    // const value = event.target.value;
    // console.log(event.target.value, value);
    // if (this.allowedSpecialKeys.indexOf(event.key) !== -1) {
    //   return;
    // }
    // const current: string = value;
    // const position = event.target.selectionStart;
    // const next: string = [
    //   current.slice(0, position),
    //   event.key === 'Decimal' ? '.' : event.key,
    //   current.slice(position)
    // ].join('');
    // if (next && !String(next).match(this.regexPettern)) {
    //   event.preventDefault();
    // }
  }

  deletePattern(value : any ): void {
    this.confirmationService.confirm({
      message: this.translate.instant('COMMON_MESSAGE.DeleteAlertL'),
      header:  this.translate.instant('COMMON_MESSAGE.DeleteHeader'),
      icon: 'pi pi-info-circle',
      accept: () => {
        this.fireBaseService.deletePattern(value).then(res => {
          this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.DeletedData'));
        })
      }
    })
  }

  

}
