import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';
import { AuthService } from 'src/app/service/auth.service';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  showPassword:boolean = false
  isAuthenticate:any
  error:any
  userList:any
  

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private messageService: CustomMessageService,
    private firebaseService: FirebaseService,
    
              ) { }

  ngOnInit(): void {
    this.buildForm()
    this.isAuthenticate =  sessionStorage.getItem('isAuthenticate')
    this.firebaseService.getAllUserList().subscribe((res: any) => {
      this.userList = res
    })
  }

  buildForm():void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() : void {
    this.authService.signIn(this.loginForm.value.username, this.loginForm.value.password).subscribe((res) => {
        if(res){
          const setItem = this.userList.find((id: any) => id.email === this.loginForm.value.username)
          const date1 = moment(setItem.endDate);
          const date2 = moment();
          // else if (date1.isSame(date2)) {
          // }
          if(date2.isBefore(date1) && setItem.status === 'active' && setItem.userRole === 'user' ){
            localStorage.setItem('userId', setItem.id)
            this.router.navigate(['web/dashboard'])
          } else if(setItem.userRole === 'admin'){
            this.router.navigate(['adminmaster'])
          } else {
            this.messageService.openCustomMessage(msgType.ERROR,'Account not activetd')
          }
        }
      }, (error) => {
        this.messageService.openCustomMessage(msgType.ERROR, error.error.error.message)
      })
  }

  navigateToRegister(){
    this.router.navigate(['/register'])
  }

  forgotpassword() {
    this.router.navigate(['/forgotpassword'])
  }
}



