import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { FormProdutosComponent } from './pages/form-produtos/form-produtos.component';
import { ListaProdutosComponent } from './pages/lista-produtos/lista-produtos.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'produtos', component: ListaProdutosComponent},
  {path: 'cadastrar-produto', component: FormProdutosComponent},
  {path: 'editar-produto/:id', component: FormProdutosComponent},
  {path: 'login', component: LoginComponent},
  {path: 'cadastro', component: CadastroComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
