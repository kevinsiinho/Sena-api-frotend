import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modulos/cuenta/login/login.component';
import { RegistroComponent } from './modulos/cuenta/registro/registro.component';
const routes: Routes = [
  {path:'',loadChildren:()=>import('./modulos/usuarios/usuarios.module').then(m=>m.UsuariosModule)},
  { path: 'login', component: LoginComponent },
  {path:'nuevo-usuario',component:RegistroComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
