import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Secciones } from '../../../class/secciones/secciones';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { SeccionService } from '../../../servicios/seccion/seccion.service';

@Component({
  selector: 'app-seccion',
  templateUrl: './seccion.component.html',
  styleUrls: ['./seccion.component.sass']
})
export class SeccionComponent implements OnInit {

  public seccion = new Secciones()
  public secciones:Secciones[]=[]
  public cantidad:Number[]=[]
  public id:string=""
  public mostrar=false


  constructor(
    private router:ActivatedRoute,
    public seccionesServices:SeccionService,
    public usuarioService:UsuariosService,
    public link:Router,
  ) {}

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

        this.seccionesServices.allCursos(this.id).then((res)=>{
          this.cantidad=[]
          this.secciones=res
          for(let i=0; i<this.secciones.length+1; i++){
              this.cantidad.push(i+1)
          }
        })
    }

  }

  Mostrar(){
    if(this.mostrar){
      this.mostrar=false
    }else{
      this.mostrar=true
    }
  }

  NuevaSeccion(){
    if(this.seccion.nombre!=null && this.seccion.posicion>0){
      this.seccion.fechaCreacion= new Date();
      this.seccion.cursoId=this.id
      this.seccion.posicion=Number(this.seccion.posicion)
      this.seccionesServices.Create(this.seccion).then((res)=>{
        if(res==200){
          this.alerta("success","Actualización","Curso actualizado correctamente.")
          this.seccion= new Secciones()
          this.ngOnInit()
        }else{
          this.alerta("error","Error","Error en el servidor, intenta más tarde")
        }
      })
    }else{
      this.alerta("error","Error","Verifica los campos, debes completar todo el formulario.")
    }
  }


  Eliminar(id:string){
    Swal.fire({
      title: "¿Estás seguro de eliminar esta sección?",
      text: "Si elimina esta sección perderás toda la información relacionada.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.seccionesServices.Delete(id).then((res)=>{
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
