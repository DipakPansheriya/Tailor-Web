import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CustomMessageService {

  // private regexPettern: RegExp = new RegExp(/^\d{0,10}$/g);
  private allowedSpecialKeys: Array<string> = [
    'Backspace',
    'Tab',
    'End',
    'Home',
    'ArrowLeft',
    'ArrowRight',
    'Del',
    'Delete'
  ];

  constructor() { }

  openCustomMessage(type : any, message : any) : void {
    Swal.fire({
      toast: true,
      position: 'top',
      showConfirmButton: false,
      icon: type,
      timerProgressBar: true,
      timer: 6000,
      title: message,
      width : 700
    })
  }

  inputRestriction(event: any, validRegexPattern : any): any {
    const value = event.target.value;
    if (this.allowedSpecialKeys.indexOf(event.key) !== -1) {
      return;
    }
    const current: string = value;
    const position = event.target.selectionStart;
    const next: string = [
      current.slice(0, position),
      event.key === 'Decimal' ? '.' : event.key,
      current.slice(position)
    ].join('');
    if (next && !String(next).match(validRegexPattern)) {
      event.preventDefault();
    }
  }

}
