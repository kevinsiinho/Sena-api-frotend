import { createComponent, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarEstudiantesComponent } from './listar-estudiantes/listar-estudiantes.component';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './usuarios.component';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { UpdateCursoComponent } from './update-curso/update-curso.component';
import { SeccionComponent } from './seccion/seccion.component';
import { ContenidoComponent } from './contenido/contenido.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { ListarContenidosComponent } from './listar-contenidos/listar-contenidos.component';
import { UpdateContenidoComponent } from './update-contenido/update-contenido.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';

const routes: Routes = [
  {path:'',component:UsuariosComponent,
    children:[
      {path:'perfil',component:PerfilComponent},
      {path:'publicacion',component:PublicacionComponent},
      {path:'listar-estudiantes',component:ListarEstudiantesComponent},
      {path:'uptade-curso/:id',component:UpdateCursoComponent},
      {path:'create-curso',component:CreateCursoComponent},
      {path:'listar-cursos',component:ListarCursosComponent},
      {path:'curso/seccion/:id',component:SeccionComponent},
      {path:'curso/seccion/contenido/:id',component:ContenidoComponent},
      {path:'lista-contenidos/:id',component:UpdateContenidoComponent},
      {path:'listar-contenidos',component:ListarContenidosComponent},
      {path:'inscribirme',component:InscripcionComponent},

    ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
