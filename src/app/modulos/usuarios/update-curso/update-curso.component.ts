import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { SeccionService } from '../../../servicios/seccion/seccion.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-update-curso',
  templateUrl: './update-curso.component.html',
  styleUrls: ['./update-curso.component.sass']
})
export class UpdateCursoComponent implements OnInit {

  public id:string=""
  public curso = new Cursos()
  constructor(
    private router:ActivatedRoute,
    public cursosService:CursosService,
    public seccionesServices:SeccionService,
    public usuarioService:UsuariosService,
    public link:Router,
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
      this.id=this.router.snapshot.paramMap.get('id')!
        this.cursosService.Uno(this.id).then((res)=>{
        this.curso=res
        console.log(this.curso)
        })


    }

  }

  actualizar(){
        if(this.curso.nombre!="" && this.curso.descripcion!="" && this.curso.estado!="" && this.curso.imagen!=""){
          this.curso.fechaActualizacion= new Date();
          this.cursosService.Update(this.curso).then((res)=>{
            if(res==204){
              this.alerta("success","Actualización","Curso actualizado correctamente.")
              this.link.navigate(["/listar-cursos"])
            }else{
              this.alerta("error","Error","Error en el servidor, intenta más tarde")
            }
          })
      }else{
        this.alerta("error","Error","Verifica los campos, debes completar todo el formulario.")
      }
  }
}


