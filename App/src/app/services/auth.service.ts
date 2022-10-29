import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

  private _registerUrl = "http://localhost:4200/cadastro";
  private _loginUrl = "http://localhost:4200/login";

  constructor(
      private http: HttpClient
  ) { }

  getToken() {
      return localStorage.getItem("token")
      //throw new Error ('Método não implementado');
  }

  registrar(request: any) {
      return this.http.post(`${environment.apiPath}/seguranca/register`, request);
  }

  registerUser(user: any){
      return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user: any){
      return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
      return !!localStorage.getItem('token')
  }
}
