import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from 'src/app/interface/AuthResponse';
import { AuthService } from 'src/app/service/auth.service';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error : any
  success : any

  registrationForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private messageService: CustomMessageService,

  ) { }

  ngOnInit(): void {
    this.buildForm()
  }

  
  buildForm():void{
    this.registrationForm = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  }

  onSubmit(): void {
      this.authService.signUp(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(
      (res) => {
          this.messageService.openCustomMessage(msgType.INFO, `Your Email: ${res.email} Register Successfully.. Go to Loginpage...`)
        },
        err => {
          this.messageService.openCustomMessage(msgType.ERROR, err.error.error.message)
      })
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

}
