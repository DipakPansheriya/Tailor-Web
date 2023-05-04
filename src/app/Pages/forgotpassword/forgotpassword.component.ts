import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/service/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  success:boolean = false
  error : any

  forgotPasswordForm!: FormGroup;
  constructor(private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private messageService: CustomMessageService,
  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  
  buildForm():void{
    this.forgotPasswordForm = this.formBuilder.group({
      email: ['',[ Validators.required , Validators.email]],
    })
  }


  submit() {
    debugger
    this.authService.forgotPassword(this.forgotPasswordForm.value.email).subscribe(
      (res) => {
        this.messageService.openCustomMessage(msgType.SUCCESS, `Email sent for Password Reset..`)
        this.forgotPasswordForm.reset()
      },
      (err)=>{
      this.messageService.openCustomMessage(msgType.ERROR, err.error.error.message)
    })
    
  }
  navigateToLogin(){
    this.router.navigate(['/login'])
  }
}

