import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: HttpClient, private authService: AuthenticationService
  ) { }
  public register(data: User[]): Observable<User[]> {
    const url = `${environment.api}/signup`;
    return this.http.post<User[]>(url, data[0]);
  }

  public setToken(token: string): void {
    sessionStorage.setItem('token', token);
  }

  public setID(id: string): void {
    localStorage.setItem('id', id);
  }

  public getToken(): string {
    return sessionStorage.getItem('token')!;
  }

  public getID(): string {
    return localStorage.getItem('id')!;
  }

  public getActive(): string {
    return localStorage.getItem('active')!;
  }

  public setActive(data: string): void {
    localStorage.setItem('active', data);
  }

  public verifyEmail(token: string) {
    const url = `${environment.api}/active-email?token=${token}`;
    return this.http.get<User[]>(url);
  }

  public signIn(data: User[]): Observable<User[]> {
    const url = `${environment.api}/signin`;
    return this.http.post<User[]>(url, data[0]);
  }

  public signOut(): Observable<User[]> {
    // localStorage.clear();
    localStorage.removeItem('active');
    localStorage.removeItem('id');
    sessionStorage.removeItem('token');
    const url = `${environment.api}/signout`;
    return this.http.get<User[]>(url);
  }

  public profile(id: string): Observable<User[]> {
    const url = `${environment.api}/profile/${id}`;
    return this.http.get<User[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public updateProfile(id: string, data: User[]): Observable<User[]> {
    const url = `${environment.api}/profile/update/${id}`;
    return this.http.put<User[]>(url, data[0], {
      headers: this.authService.getHeader(),
    });
  }

  public uniqueEmail(email: string): Observable<User[]> {
    const url = `${environment.api}/profile/unique-email?email=${email}`;
    return this.http.get<User[]>(url, {
      headers: this.authService.getHeader(),
    });
  }

  public profileDetail(id: string): Observable<User[]> {
    const url = `${environment.api}/profile/${id}`;
    return this.http.get<User[]>(url, {
      headers: this.authService.getHeader(),
    });
  }
}
