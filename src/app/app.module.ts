import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChangepasswordComponent } from './Pages/changepassword/changepassword.component';
import { LoginComponent } from './Pages/login/login.component';
import { RegisterComponent } from './Pages/register/register.component';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';
import { provideStorage, getStorage } from "@angular/fire/storage";
import { provideFirebaseApp } from '@angular/fire/app';
import { HttpClientModule } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ForgotpasswordComponent } from './Pages/forgotpassword/forgotpassword.component';
import { environment } from 'src/environments/environment.prod';
import { AdminMasterComponent } from './Pages/admin-master/admin-master.component';


@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    AdminMasterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    TranslateModule,
    provideFirebaseApp(()=>initializeApp(environment.firebaseConfig)),
    provideFirestore(()=> getFirestore()),
    provideAuth(() => getAuth()),
    provideStorage(()=> getStorage()) , HttpClientModule],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
