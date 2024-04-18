import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule } from '@angular/forms';
import { ContenidoComponent } from './contenido/contenido.component';
import { CreateCursoComponent } from './create-curso/create-curso.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { ListarContenidosComponent } from './listar-contenidos/listar-contenidos.component';
import { ListarCursosComponent } from './listar-cursos/listar-cursos.component';
import { ListarEstudiantesComponent } from './listar-estudiantes/listar-estudiantes.component';
import { MenuComponent } from './menu/menu.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { SeccionComponent } from './seccion/seccion.component';
import { UpdateContenidoComponent } from './update-contenido/update-contenido.component';
import { UpdateCursoComponent } from './update-curso/update-curso.component';
import { UsuariosComponent } from './usuarios.component';



@NgModule({
  declarations: [
    UsuariosComponent,
    MenuComponent,
    ListarEstudiantesComponent,
    PerfilComponent,
    ListarCursosComponent,
    CreateCursoComponent,
    UpdateCursoComponent,
    SeccionComponent,
    ContenidoComponent,
    PublicacionComponent,
    ListarContenidosComponent,
    UpdateContenidoComponent,
    InscripcionComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,

  ]
})
export class UsuariosModule { }
