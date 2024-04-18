import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Publicacion } from '../../../class/publicacion/publicacion';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { SeccionService } from '../../../servicios/seccion/seccion.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { PublicacionService } from '../../../servicios/Publicacion/publicacion.service';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { Cursos } from '../../../class/cursos/cursos';

@Component({
  selector: 'app-listar-contenidos',
  templateUrl: './listar-contenidos.component.html',
  styleUrls: ['./listar-contenidos.component.sass']
})
export class ListarContenidosComponent implements OnInit {


  public publicaciones:Publicacion[]=[]
  public usuario= new Usuarios ()


  constructor(
    public seccionesServices:SeccionService,
    public usuarioService:UsuariosService,
    public publicacionServices:PublicacionService,
    public cursosServices:CursosService,
    public link:Router,
  ) {}

  alerta(icono:SweetAlertIcon,titulo:string,texto:string){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono
    });
  }

  async ngOnInit(){
    if(await this.usuarioService.Verificar()){
      const { value } = await Preferences.get({ key: 'token' });
      this.usuarioService.Quien(value!).then((res)=>{
        this.usuarioService.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
          if(this.usuario.tipoCuenta=="docente"){
              this.cursosServices.allCursos(res.data).then((res)=>{
                res.forEach((cursos:Cursos) => {
                  this.publicacionServices.allPublicacion(cursos.id!).then((data)=>{
                    data.forEach((x:Publicacion) => {
                      this.publicaciones.push(x)
                    });
                  })
                });
              })
            }else if(data.tipoCuenta=="estudiante"){
              this.cursosServices.all().then((cursos)=>{
                cursos.forEach((curso:any) => {
                  console.log(curso.nombre)
                  if(!curso.participantes){
                    curso.participantes=[]
                 }
                  curso.participantes.forEach((parti:any) => {
                    if(parti==this.usuario.id){
                      console.log("ids- "+parti+"="+this.usuario.id)
                      this.publicacionServices.allPublicacion(curso.id!).then((res:[])=>{
                        res.forEach(publicaion => {
                          this.publicaciones.push(publicaion)
                        });
                      })
                    }
                  });
                });
              })
            }
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
        this.publicacionServices.Delete(id).then((res)=>{
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

