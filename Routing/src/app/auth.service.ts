import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, ReplaySubject, Subject, tap } from 'rxjs';
import { AuthResponse, LoginRequest, RegisterRequest } from './auth-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedSubj = new ReplaySubject<false|AuthResponse["user"]>();

  registerUrl = "http://localhost:3000/register"
  loginUrl = "http://localhost:3000/login"

  constructor(private http:HttpClient) { }

  register(data:RegisterRequest) {
    return this.http.post<AuthResponse>(this.registerUrl, data).pipe(catchError((err)=>{
      console.log(err);
      throw err
    }))
  }

  login(data:LoginRequest) {
    return this.http.post<AuthResponse>(this.loginUrl, data).pipe(catchError(err=>{
      console.log(err);
      throw err;
    }), tap((res)=>{
      localStorage.setItem("token", res.accessToken)
      this.loggedSubj.next(res.user)
    }))
  }

  logout(){
    localStorage.removeItem("token")
    this.loggedSubj.next(false)
  }

  getLoggedObs() {
    return this.loggedSubj.asObservable()
  }

  getUserById(id:number, token:string) {
    this.http.get<AuthResponse['user']>("http://localhost:3000/users/"+id, {
      headers:{
        "Authorization": "Bearer " + token
      }
    }).pipe(tap((res)=>{
      this.loggedSubj.next(res)
    }))
  }

  autologin() {
    let token = localStorage.getItem("token")
    if(token) {
      //TODO: leggere id con JWTHelper
      this.getUserById(0, token)
    }
  }
}
