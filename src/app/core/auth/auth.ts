import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface LoginRequest {
  username: string;
  password: string;
}

interface LoginResponse {
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  login(credentials: { username: string; password: string }) {
    return this.http.post<{ token: string }>(
      'http://localhost:8080/api/auth/login',
      credentials
    );
  }
  getCurrentUser(): Observable<any> {
    return this.http.get('http://localhost:8080/api/auth/me');
  }
}
