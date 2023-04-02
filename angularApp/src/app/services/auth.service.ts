import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {

  userData = new BehaviorSubject(null);

  constructor(private HttpClient:HttpClient,private router:Router) {
    if(localStorage.getItem('accessToken') !==null){
      this.decodedUserData();
    }
  }

  decodedUserData(){
    let encodedToken = JSON.stringify(localStorage.getItem('accessToken'));
    let decodedToken: any = jwtDecode(encodedToken);
    this.userData.next(decodedToken);
  }

  register(userData:object):Observable<any>{
    return this.HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/signup`, userData);
  }

  login(userData:object):Observable<any>{
    return this.HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/auth/signin`, userData);
  }

  logout(){
    localStorage.removeItem('accessToken');
    this.userData.next(null);
    this.router.navigate(['/login']);
  }
}
