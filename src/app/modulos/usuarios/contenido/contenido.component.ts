import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Secciones } from '../../../class/secciones/secciones';
import { Cursos } from '../../../class/cursos/cursos';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { Comentar } from '../../../class/comentar/comentar';
import { Publicacion } from '../../../class/publicacion/publicacion';
import { SeccionService } from '../../../servicios/seccion/seccion.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { PublicacionService } from '../../../servicios/Publicacion/publicacion.service';

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.component.html',
  styleUrls: ['./contenido.component.sass']
})
export class ContenidoComponent implements OnInit {

  public seccion = new Secciones()
  public curso = new Cursos()
  public usuario = new Usuarios()
  public comentar= new Comentar()
  public secciones:Secciones[]=[]
  public todo:any[]=[]
  public publicaciones:Publicacion[]=[]
  public id:string=""
  public Inputcomentarios: { [key: string]: string } = {};


  constructor(
    private router:ActivatedRoute,
    public seccionesServices:SeccionService,
    public usuarioService:UsuariosService,
    public cursosService:CursosService,
    public publicacionServices:PublicacionService,
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
      const { value } = await Preferences.get({ key: 'token' });

        this.usuarioService.Quien(value!).then((res)=>{
        this.usuarioService.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
        })
      })


      this.id=this.router.snapshot.paramMap.get('id')!
      this.cursosService.Uno(this.id).then((res)=>{
        this.curso=res
        })

        this.seccionesServices.allCursos(this.id).then((res)=>{
          this.todo=res
          this.publicacionServices.all().then((res2)=>{
            this.publicaciones=res2
             this.todo.forEach((seccion:any) => {
              const publicacionesDeLaSeccion = this.publicaciones.filter((publicacion) => publicacion.seccionId === seccion.id);
              seccion.publicaciones = publicacionesDeLaSeccion;
            });

            console.log(this.todo)
          })
        })
    }
  }



  Comentar(id: string) {
    const comentario = this.Inputcomentarios[id];
    if (comentario && comentario.trim() !== "") {
        this.publicaciones.forEach(publicacion => {
          if(publicacion.id===id){
            if (!publicacion.Observaciones) {
              publicacion.Observaciones = [];
            }
            this.comentar.nombre=this.usuario.nombres
            this.comentar.texto=comentario
            this.comentar.fecha= new Date()
            publicacion.Observaciones.push(this.comentar)
            this.publicacionServices.Update(publicacion).then((res)=>{
              if(res==204){
                this.alerta("success", "Correcto", "Comentario guardado correctamente.");
                this.Inputcomentarios[id]=""
              }else{
                this.alerta("error", "Error", "Error en el servidor, intenta más tarde.");
              }
            })
          }
        });

    } else {
      this.alerta("error", "Error", "Debes escribir algo.");
    }
  }



}
