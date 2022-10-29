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
      //throw new Error ('Método não implementado');
  }

  registerUser(user: any) {
      return this.http.post(`${environment.apiPath}/seguranca/register`, user);
  }

  loginUser(user: any){
      //return this.http.post<any>(this._loginUrl, user)
      return this.http.post(`${environment.apiPath}/seguranca/login`, user);
  }

  loggedIn(){
      return !!localStorage.getItem('token')
  }
}
