import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.sass']
})
export class InscripcionComponent implements OnInit {

  public cursos:Cursos[]=[]
  public usuario = new Usuarios()
  public id!:string

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
      this.id=res.data
    })

    this.cursosServices.all().then((data)=>{
      this.cursos=data
    })
  }
}

add(idcurso:string){
  let estado=false
  this.cursos.forEach(curso => {

    if(!curso.participantes){
      curso.participantes=[]
    }

      if(curso.id===idcurso){
        //verificar si ya esta en el curso
        curso.participantes = curso.participantes || [];

         curso.participantes.forEach(x => {
            if(x==this.id){
              estado=true
              return;
            }
          });

          if(!estado){
            curso.participantes.push(this.id)
            this.cursosServices.Update(curso).then((res)=>{
              if(res===204){
                this.alerta("success","Bien","Te haz añadido a este curso.")
              }else{
                this.alerta("error","Error","Error en el servidor, intenta más tarde")
              }
            })
          }else{
            this.alerta("error","Error","Ya estás inscripto a este curso")
          }
      }
  });
}

}
