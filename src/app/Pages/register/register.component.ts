import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse, UserList } from 'src/app/interface/AuthResponse';
import { AuthService } from 'src/app/service/auth.service';
import { CustomMessageService } from 'src/app/service/custom-message/custom-message.service';
import { FirebaseService } from 'src/app/service/firebase.service';
import { msgType } from 'src/assets/Constant/message-constant';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  error : any
  success : any
  endData : any

  registrationForm!: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private router:Router,
    private authService: AuthService,
    private messageService: CustomMessageService,
    private firebaseService: FirebaseService,

  ) { }

  ngOnInit(): void {
    this.buildForm()
    this.firebaseService.getAllUserList().subscribe((res: any) => {
      if (res) {
        console.log("res==========", res);
      }
    })
    this.endData = new Date(new Date().setMonth(new Date().getMonth() + 3)).toLocaleDateString('en-GB');
    console.log(this.endData , "this.endData-----------------");
  }

  
  buildForm():void{
    this.registrationForm = this.formBuilder.group({
      email: ['',[ Validators.required, Validators.email]],
      password: ['', Validators.required],
      mobileNo : [],
      companyMobile : [],
      companyName : [],
      companyAddress : []
    })
  }

  onSubmit(): void {
      this.authService.signUp(this.registrationForm.value.email, this.registrationForm.value.password).subscribe(
      (res) => {
          this.messageService.openCustomMessage(msgType.SUCCESS, `Your Email: ${res.email} Register Successfully.. Go to Loginpage...`)

          const payload: UserList = {
            id: '',
            email: this.registrationForm.value.email,
            mobileNo: this.registrationForm.value.mobileNo,
            companyMobile: this.registrationForm.value.companyMobile,
            companyName: this.registrationForm.value.companyName,
            companyAddress: this.registrationForm.value.companyAddress,
            password: this.registrationForm.value.password,
            status: 'inactive',
            endDate: this.endData,
            userRole: 'user'
          }

          this.firebaseService.addUserData(payload).then((res: any) => {
            if (res) {

            }
          })
        },
        err => {
          this.messageService.openCustomMessage(msgType.ERROR, err.error.error.message)
      })
  }

  navigateToLogin(){
    this.router.navigate(['/login'])
  }

}
