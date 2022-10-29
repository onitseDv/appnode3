import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { text } from 'express';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginUserData: any = {
    login:'',
    senha:''
  }

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit(): void {
  }
    
  loginUser(){
    this._auth.loginUser(this.loginUserData)
      .subscribe(
        (res: any) => {
          console.log(res)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/produtos'])
        },
        err => {
          alert(err?.error?.message || "Usuário ou senha inválidos!")
          console.error(err);
        }
      )
  }
  

}
