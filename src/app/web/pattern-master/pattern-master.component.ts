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
    this.isPatternVisible = false;
    this.patternName = ''
    this.patternPrice = ''
    this.patternCategory = ''
    this.patternId = ''
  }
  
  addArticalRate() : void{
    this.articalTypeName = ''
    this.articalRate = ''
    this.isArticalRateVisible = false;
    
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
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    } else {
      this.fireBaseService.updatePattern(this.patternId, payload ).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.UpdateData') );
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
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    } else {
      this.fireBaseService.updateArticalRateInfo(this.articalRateInfoId, payload ).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.UpdateData') );
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    }
  }

  editPattern(value: any): void {
    this.isPatternVisible = true;
    this.patternId = value.id
    this.patternName = value.patternName
    this.patternPrice = value.patternPrice
    this.patternCategory = value.patternCategory
  }

  editArticalRateInfo(value: any): void {
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

  inputRestriction(event: any, type: any): any {
    if (type === 'price') {
      this.messageService.inputRestriction(event, this.validPricePattern)
    } else {
      this.messageService.inputRestriction(event, this.validPatternName)
    }
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
