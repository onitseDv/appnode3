/*
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    constructor() { }
}
*/

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    getToken(){
        throw new Error ('Método não implementado');
    }

    private _registerUrl = "http://localhost:4200/cadastro";
    private _loginUrl = "http://localhost:4200/login";

    constructor(private http: HttpClient){ }
    
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