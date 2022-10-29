import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  private getHeaders() {
    let headers = new HttpHeaders();
    headers = headers.append("Authorization", `Bearear ${this.authService.getToken()}`)
    return headers;
  }

  getProdutos() {
    return this.http.get(`${environment.apiPath}/produtos`, {headers: this.getHeaders()})
  }
  
}
