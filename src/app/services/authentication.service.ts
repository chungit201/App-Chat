import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor() { }
  
  public isAuthenticated(): boolean {
    const token = sessionStorage.getItem('token');
    const jwtHelper = new JwtHelperService();
    if (token === null) return false;
    return !jwtHelper.isTokenExpired(token);
  }
  public getHeader(): any {
    const token = sessionStorage.getItem('token');
    if (!token) {
      return null;
    }
    return new HttpHeaders().set('Authorization', 'Bearer ' + token);
  }
}

