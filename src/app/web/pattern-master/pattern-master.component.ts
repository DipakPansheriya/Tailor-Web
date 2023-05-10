import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ConfirmationService } from 'primeng/api';
import { Patterns } from 'src/app/interface/AuthResponse';
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
  patterns: any = [];
  patternPrice: any
  patternName: any
  patternCategory: any;
  patternId : any ;
  headingName = 'Add New Pattern';
  validPricePattern: RegExp = new RegExp(/^\d{0,10}$/g);
  validPatternName: RegExp = new RegExp(/^[a-zA-Z ]*$/g);
  // private regexPettern: RegExp = new RegExp(/^\d*\.?\d{0,3}$/g);
  // private regexPettern: RegExp = new RegExp(/^\d{0,10}$/g);
  // private allowedSpecialKeys: Array<string> = [
  //   'Backspace',
  //   'Tab',
  //   'End',
  //   'Home',
  //   'ArrowLeft',
  //   'ArrowRight',
  //   'Del',
  //   'Delete'
  // ];

  constructor( 
    private fireBaseService: FirebaseService,
    private messageService : CustomMessageService,
    private confirmationService: ConfirmationService,
    private translate: TranslateService,
  ) { }

  
  ngOnInit(): void {
    this.getAllPentPatterns();
  }
  
  getAllPentPatterns(): void {
    this.fireBaseService.getAllPatterns().subscribe((res => {
      if (res) {
        this.patterns = res;
        console.log("patterns=======>", this.patterns);
      }
    }))
  }

  addNewPattern() : void {
    this.isPatternVisible = true;
    this.headingName = this.translate.instant('PATTERN_MASTER.ADD_NEW')
    this.patternName = ''
    this.patternPrice = ''
    this.patternCategory = ''
    this.patternId = ''
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
      this.fireBaseService.updatePattern(this.patternId, payload ).then(res => {
        this.messageService.openCustomMessage(msgType.SUCCESS, this.translate.instant('COMMON_MESSAGE.UpdateData') );
        this.isPatternVisible = false;
        this.patternName = ''
        this.patternPrice = ''
        this.patternCategory = ''
      })
    }
  }


  editPattern(value: any): void {
    this.headingName = this.translate.instant('PATTERN_MASTER.EDIT')
    this.isPatternVisible = true;
    this.patternId = value.id
    this.patternName = value.patternName
    this.patternPrice = value.patternPrice
    this.patternCategory = value.patternCategory
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
