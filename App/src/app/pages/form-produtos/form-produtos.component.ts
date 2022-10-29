import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-form-produtos',
  templateUrl: './form-produtos.component.html',
  styleUrls: ['./form-produtos.component.scss']
})
export class FormProdutosComponent implements OnInit {
  @ViewChild('form') ngForm!: NgForm;
  
  loading = false;
  idProduto?: number;

  constructor(
    private produtoService: ProdutoService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.idProduto = this.route.snapshot.params['id'];
    if (this.idProduto) {
      this.buscarProduto(this.idProduto);
    }
  }

  buscarProduto(id: number) {
    this.produtoService.getProdutoById(id).subscribe(response => {
      this.ngForm.form.patchValue(response)
    }, err => {
      alert(err?.error?.message || "Erro ao buscar produto, consulte o log!")
      console.log(err)
    })
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      const request = this.idProduto 
        ? this.produtoService.editarProduto.bind(this.produtoService, this.idProduto, form.value)
        : this.produtoService.cadastrarProduto.bind(this.produtoService, form.value)

      request().subscribe(response => {
        this.loading = false;
        alert("Produto cadastrado com sucesso!")
        this.router.navigateByUrl("/produtos")
      }, err => {
        this.loading = false;
        alert(err?.error?.message || "Erro ao salvar produto, consulte o log!")
        console.error(err)
      })
    } else {
      alert("Formulário inválido")
    }
  }

}
