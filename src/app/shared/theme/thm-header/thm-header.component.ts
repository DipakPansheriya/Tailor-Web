import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from 'src/app/service/auth.service';
import { FirebaseService } from 'src/app/service/firebase.service';

@Component({
  selector: 'app-thm-header',
  templateUrl: './thm-header.component.html',
  styleUrls: ['./thm-header.component.scss']
})
export class ThmHeaderComponent implements OnInit {
  @Output() sideNavToggled = new EventEmitter<boolean>();
  @Output() sideNavToggledClosed = new EventEmitter<boolean>();
  

  menuStatus: boolean = false
  menuStatusClose: boolean = true
  Clicked: boolean = true
  companyName :any
  
  language = [
    {value : 'en'},
    {value : 'gu'},
]

 

  constructor(
    // private firebaseService: FirebaseService,
    private router: Router,
    private translate: TranslateService,
    private authService: AuthService,
    private firebaseService: FirebaseService
  ) { 
    translate.setDefaultLang('en')
    
  }
  ngOnInit(): void {
    this.firebaseService.getAllUserList().subscribe((res:any) =>{
      if(res){
        const userId = localStorage.getItem("userId")
        this.companyName = res.find((id:any) => id.id === userId).companyName       
      }
    })
  }

  logOut(){
    this.authService.signOut();
    localStorage.clear()
  }  

  languageChange(event:any){
    this.translate.use(event.attributes.value.value)
  }

}
