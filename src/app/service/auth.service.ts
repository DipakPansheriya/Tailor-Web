
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import {  tap } from 'rxjs/operators';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment.prod';
import { AuthResponse } from '../interface/AuthResponse';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User> (null!);
//  private tokenExpirationTimer:any

  constructor(private http:HttpClient, private router:Router) { }


  signUp(email:any ,password:any){
    return this.http.post<AuthResponse>(environment.signUp,{
    // return  this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw`,{
      email:email,
      password:password,
      returnSecureToken: true,
    }).pipe(
      tap(res =>{
        this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  signIn(email:any ,password:any){
    // return  this.http.post<AuthResponse>(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw`,{
    return this.http.post<AuthResponse>(environment.signIn, {
      email:email,
      password:password,
      returnSecureToken: true,
    }).pipe(
      tap(res =>{
        this.authenticatedUser(res.email,res.localId,res.idToken,+res.expiresIn)
      })
    )
  }

  signOut(){
    this.user.next(null!)
    this.router.navigate(['/login']);
    localStorage.removeItem('UserData')
    localStorage.clear()
  }

  // autoSignOut(expirationDuration:any){
  //   this.tokenExpirationTimer =  setTimeout(() => {
  //       this.signOut();
  //   }, expirationDuration);
  // }

  // autoSignIn(){
  //   const userDataList = sessionStorage.getItem('UserData');
  //   const userData = JSON.parse(userDataList!)
  //   if(!userData){
  //     return
  //   }
  //   const loggedInUser = new User(userData.email, userData.id , userData._token, new Date(userData._tokenExpirationDate))
  //   if(loggedInUser.token){
  //     this.user.next(loggedInUser);
  //     const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
  //     // this.autoSignOut(expirationDuration)
  //   }
  // }

  private authenticatedUser(email: any, userId: any, token: any, expiredIn: any) {
    const expirationDate = new Date(new Date().getTime() + expiredIn*100);
    const user =  new User(email,userId,token,expirationDate)
    // this.autoSignOut(expiredIn*1000)    
    this.user.next(user);
    localStorage.setItem('UserData',JSON.stringify(user) )
  } 

  forgotPassword(email:any){
    // return  this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw`,{
    return this.http.post<any>(environment.forgetPassword,{
      requestType:'PASSWORD_RESET',
      email:email
    })
  }

  changePassword(data:any){
    // return this.http.post<any>(`https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDAtXwI6GLP7h2GSOyWXhyeekh4uqaVfjw`,{
    return this.http.post<any>(environment.changePassword,{
      idToken:data.idToken,
      password:data.password,
      returnSecureToken:true
    })
  }
  
}
