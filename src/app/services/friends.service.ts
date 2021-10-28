import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Friend } from '../models/friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {

  constructor(
    private http: HttpClient
  ) { }
  public getFriend(): Observable<Friend[]> {
    const url = `${environment.api}/friend`;
    return this.http.get<Friend[]>(url);
  }
  public findUser(id: String): Observable<Friend[]> {
    const url = `${environment.api}/friend/find-user?friend=${id}`;
    return this.http.get<Friend[]>(url);

  }

  public follow(data: Friend[]): Observable<Friend[]> {
    const url = `${environment.api}/add-friend`;
    return this.http.post<Friend[]>(url, data[0]);
  }

  public update(id: string, data: Friend[]): Observable<Friend[]> {
    const url = `${environment.api}//friend/update/${id}`;
    return this.http.put<Friend[]>(url, data[0]);
  }

  public updateClearFriend(
    id: string,
    data: Friend[]
  ): Observable<Friend[]> {
    const url = `${environment.api}/friend/clear/${id}`;
    return this.http.put<Friend[]>(url, data[0]);
  }
}
