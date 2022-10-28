import { Component, OnInit } from '@angular/core';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-lista-produtos',
  templateUrl: './lista-produtos.component.html',
  styleUrls: ['./lista-produtos.component.scss']
})
export class ListaProdutosComponent implements OnInit {
  produtos: any = []

  constructor(
    private produtoService: ProdutoService
  ) { }

  ngOnInit(): void {
    this.buscarProdutos();
  }

  buscarProdutos() {
    this.produtoService.getProdutos().subscribe((produtos) => {
      console.log("Produtos:", produtos)
      this.produtos = produtos;
    }, err => {
      alert(err?.error?.message || "Erro ao buscar produtos! Consulte o log")
      console.error(err);
    })
  }

  DeletarProduto(){

  }
}
