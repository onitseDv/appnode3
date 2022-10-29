import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProdutoService } from 'src/app/services/produto.service';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {
  loading = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      this.loading = true;
      this.authService.registerUser(form.value).subscribe(response => {
        this.loading = false;
        alert('Usuário cadastrado com sucesso!');
        this.router.navigateByUrl('/login')
      }, err => {
        this.loading = false;
        alert('Erro ao cadastrar usuário! Consulte o log')
        console.error(err);
      })
    } else {
      alert('Formulário Inválido')
    }
  }

}
