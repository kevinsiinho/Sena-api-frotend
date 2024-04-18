import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.sass']
})
export class ListarCursosComponent implements OnInit {

  public cursos:Cursos[]=[]
  public usuario = new Usuarios()

  constructor(
    public cursosServices:CursosService,
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
        this.usuarioService.Quien(value!).then((res)=>{
        this.usuarioService.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
          this.cursosServices.all().then((res)=>{
          //comprobando que este matriculado
          if(this.usuario.tipoCuenta==="estudiante"){
            res.forEach((curso:Cursos) => {
              if(!curso.participantes){
                 curso.participantes=[]
              }
              curso.participantes.forEach(userid => {
                if(userid===this.usuario.id){
                  this.cursos.push(curso)
                }
              });
           });
          }else if(this.usuario.tipoCuenta==="docente"){
            res.forEach((curso:Cursos) => {
              if(curso.creadorId==this.usuario.id){
                this.cursos.push(curso)
              }
            });
          }
        })
      })
    })
  }
}


  Eliminar(id:string){
    Swal.fire({
      title: "¿Estás seguro de eliminar este curso ?",
      text: "Si elimina este curso perderás toda la información relacionada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.cursosServices.Delete(id).then((res)=>{
          if(res==204){
            this.alerta("success","Correcto","Curso eliminado")
            this.ngOnInit()
          }else{
            this.alerta("error","Error","Error en el servidor, intenta más tarde")
          }
        })
      }
    });
  }
}

