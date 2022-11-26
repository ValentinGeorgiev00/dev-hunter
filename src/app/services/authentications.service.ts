import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { LoginResponse } from '../models/LoginResponse.model';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  url: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  register$(
    email: string,
    password: string,
    username: string
  ): Observable<LoginResponse> {
    const user = { email, password, username };

    return this.http.post<LoginResponse>(`${this.url}register`, user);
  }

  login$(email: string, password: string): Observable<LoginResponse> {
    const user = { email, password };
    return this.http.post<LoginResponse>(`${this.url}login`, user);
  }
}
