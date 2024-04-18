import { Routes } from '@angular/router';
import { LoginComponent } from './modulos/cuenta/login/login.component';
import { RegistroComponent } from './modulos/cuenta/registro/registro.component';


export const routes: Routes = [
  {path:'',loadChildren:()=>import('./modulos/usuarios/usuarios.module').then(m=>m.UsuariosModule)},
  { path: 'login', component: LoginComponent },
  {path:'nuevo-usuario',component:RegistroComponent}
];
