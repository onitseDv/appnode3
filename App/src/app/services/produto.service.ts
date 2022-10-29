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

  cadastrarProduto(produto: any) {
    return this.http.post(`${environment.apiPath}/produtos/adicionarProduto`, produto, {headers: this.getHeaders()})
  }

  editarProduto(id: number, produto: any) {
    return this.http.put(`${environment.apiPath}/produtos/alteraProduto/${id}`, produto, {headers: this.getHeaders()});
  }

  getProdutoById(id: number) {
    return this.http.get(`${environment.apiPath}/produtos/${id}`, {headers: this.getHeaders()})
  }

  deletarProduto(id: number) {
    return this.http.delete(`${environment.apiPath}/produtos/deleta${id}`, {headers: this.getHeaders()})
  }

  
}
