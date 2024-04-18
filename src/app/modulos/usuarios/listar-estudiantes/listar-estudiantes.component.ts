import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { Cursos } from '../../../class/cursos/cursos';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { Preferences } from '@capacitor/preferences';

@Component({
  selector: 'app-listar-estudiantes',
  templateUrl: './listar-estudiantes.component.html',
  styleUrls: ['./listar-estudiantes.component.sass']
})
export class ListarEstudiantesComponent implements OnInit {
public usuario= new Usuarios();
public usuarios:Usuarios[]=[];
public cursos:Cursos[]=[]
cursoSeleccionado!:string;
constructor(
  public cursosServices:CursosService,
  public usuarioService:UsuariosService,
) { }

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

  onChangeCurso(event:any) {
    this.cursoSeleccionado = event.target.value;
    this.usuarios=[]
    this.cursos.forEach(curso => {
       if(curso.id===this.cursoSeleccionado){
          curso.participantes.forEach(user => {
            this.usuarioService.InfoUsuarios(user).then((res)=>{
              this.usuarios.push(res)
            })
          });
       }
    });
  }

}
