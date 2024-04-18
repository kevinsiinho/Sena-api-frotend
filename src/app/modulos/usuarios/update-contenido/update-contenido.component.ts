import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { Publicacion } from '../../../class/publicacion/publicacion';
import { Secciones } from '../../../class/secciones/secciones';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { PublicacionService } from '../../../servicios/Publicacion/publicacion.service';
import { SeccionService } from '../../../servicios/seccion/seccion.service';

@Component({
  selector: 'app-update-contenido',
  templateUrl: './update-contenido.component.html',
  styleUrls: ['./update-contenido.component.sass']
})
export class UpdateContenidoComponent implements OnInit {

   public cursos:Cursos[]=[]
  public publicacion = new Publicacion()
  public secciones:Secciones[]=[]
  cursoSeleccionado!: string;
  public id!:string
  archivosSeleccionados: FileList | null = null;
  public tipoContenido=[
    {"tipo":"Foro"},
    {"tipo":"Video"},
    {"tipo":"Texto"},
  ]

  constructor(
    public cursosServices:CursosService,
    public usuarioService:UsuariosService,
    public seccionesServices:SeccionService,
    public publicacionServices:PublicacionService,
    private router:ActivatedRoute,
  ) { }

  alerta(icono:SweetAlertIcon,titulo:string,texto:string){
    Swal.fire({
      title: titulo,
      text: texto,
      icon: icono
    });
  }

  async ngOnInit(){
    if(await this.usuarioService.Verificar()){
      this.id=this.router.snapshot.paramMap.get('id')!
      this.publicacionServices.Uno(this.id).then((res)=>{
        this.publicacion=res
      })
      this.cursosServices.all().then((res)=>{
        this.cursos=res
      })
      this.seccionesServices.all().then((res)=>{
        this.secciones=res
      })
    }
}

onChangeCurso(event:any) {
  this.cursoSeleccionado = event.target.value;
  this.seccionesServices.allCursos(this.cursoSeleccionado).then((res)=>{
    this.secciones=res
  })
}

Actualizar(){
  if(this.publicacion.nombre!=null && this.publicacion.descripcion!=null && this.publicacion.tipo!=null && this.publicacion.comentarios!=null && this.publicacion.seccionId!=null && this.publicacion.cursoId!=null){
    this.publicacion.fechaCreacion= new Date();
    this.publicacion.cursoId=this.cursoSeleccionado
    this.publicacion.comentarios=Boolean(this.publicacion.comentarios)
    this.publicacionServices.Update(this.publicacion).then((res)=>{
      if(res==204){
        this.alerta("success","Actualización","Contenido actualizado correctamente.")
      }else{
        this.alerta("error","Error","Error en el servidor, intenta más tarde")
      }
    })
  }else{
    this.alerta("error","Error","Verifica los campos, debes completar todo el formulario.")
  }
}


archivos(event: any) {
  this.archivosSeleccionados = event.target.files;

  // Llamar a mostrarArchivo() solo si hay archivos seleccionados
  if (this.archivosSeleccionados) {
    // Iterar sobre los archivos seleccionados
    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      const file = this.archivosSeleccionados[i];

      // Comprobar el tipo de archivo
      if (file.type.startsWith('image/')) {
        // Es una imagen
      //  this.mostrarImagen(file);
   //     this.publicacion.archivos.push({"tipo": "imagen", "data": file});
      } else if (file.type.startsWith('video/')) {
        // Es un video
      //  this.mostrarVideo(file);
     //   this.publicacion.archivos.push({"tipo": "video", "data": file});
      } else {
        console.log('Tipo de archivo no admitido: ' + file.name);
       // this.publicacion.archivos.push({"tipo": "otro", "data": file});
        // Mostrar el nombre del archivo en la interfaz de usuario
     //  this.mostrarNombreArchivo(file)
      }
    }
  }
}

eliminarImagen(index: number) {
//  this.publicacion.archivos.splice(index, 1);
}

descargarArchivo(archivo: File) {
  const url = URL.createObjectURL(archivo);
  const a = document.createElement('a');
  a.href = url;
  a.download = archivo.name;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
}

}
