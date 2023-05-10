import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
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
  }

  buildForm():void{
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  submit() : void {
    this.authService.signIn(this.loginForm.value.username, this.loginForm.value.password).subscribe(
      (res) => {
        this.firebaseService.getAllUserList().subscribe((res: any) => {
          if (res) {
            const setItem = res.find((id: any) => id.email === this.loginForm.value.username).id
            localStorage.setItem('userId',setItem)
          }
        })
        this.router.navigate(['web/dashboard'])
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



