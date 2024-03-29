import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public username:string="";
  perfilImg?:string;
  constructor(private http: HttpClient) {}

  register(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/register', body);
  }
  login(body: any): Observable<any> {
    return this.http.post('http://localhost:3000/api/auth/login', body);
  }
}
