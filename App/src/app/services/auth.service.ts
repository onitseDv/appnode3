import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private http: HttpClient
  ) { }

  getToken() {
    return localStorage.getItem("token")
  }

  registrar(request: any) {
    return this.http.post(`${environment.apiPath}/seguranca/register`, request);
  }
}
