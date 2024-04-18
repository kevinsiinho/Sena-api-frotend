import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-create-curso',
  templateUrl: './create-curso.component.html',
  styleUrls: ['./create-curso.component.sass']
})
export class CreateCursoComponent implements OnInit {

  public curso= new Cursos()
  public usuario= new Usuarios()
  public cursos:Cursos[]=[]

  constructor(
    public cursoService:CursosService,
    public usuarioService:UsuariosService,
  ) { }

  alerta(icono:SweetAlertIcon,titulo:string,texto:string){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono
    });
  }

async  ngOnInit(){
    if(await this.usuarioService.Verificar()){
      const { value } = await Preferences.get({ key: 'token' });
      if(value){
        this.usuarioService.Quien(value).then((res)=>{
        this.usuarioService.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
        })
        })
      }
    }
  }


  crear(){
    if(this.curso.nombre!=null && this.curso.descripcion!=null && this.curso.estado!=null && this.curso.imagen!=null){
        this.curso.fechaCreacion= new Date();
        this.curso.participantes=[]
        this.curso.secciones=[]
        this.curso.creadorId=this.usuario.id
        this.cursoService.Create(this.curso).then((res)=>{
          if(res.status==200){
            this.usuario.cursos.push(res.data.id.toString())
            this.usuarioService.Update(this.usuario).then()
            this.curso= new Cursos()
            this.alerta("success","Correcto","Curso guardado correctamente.")
          }else{
            this.alerta("error","Error","Error en el servidor, intenta más tarde")
          }
        })
    }else{
      this.alerta("error","Error","Verifica los campos, debes completar todo el formulario.")
    }
  }

}
