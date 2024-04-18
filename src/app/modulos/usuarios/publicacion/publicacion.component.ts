import { Component, OnInit } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

import Swal, { SweetAlertIcon } from 'sweetalert2';
import { Cursos } from '../../../class/cursos/cursos';
import { Publicacion } from '../../../class/publicacion/publicacion';
import { Secciones } from '../../../class/secciones/secciones';
import { CursosService } from '../../../servicios/cursos/cursos.service';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';
import { SeccionService } from '../../../servicios/seccion/seccion.service';
import { PublicacionService } from '../../../servicios/Publicacion/publicacion.service';
import { FileService } from '../../../servicios/file/file.service';

@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.sass']
})
export class PublicacionComponent implements OnInit {

  public cursos:Cursos[]=[]
  public publicacion = new Publicacion()
  public secciones:Secciones[]=[]
  cursoSeleccionado!: string;
  archivosSeleccionados:any[]=[]
  imagenesPrevisualizadas: string[] = [];

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
    public fileService:FileService
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
      const { value } = await Preferences.get({ key: 'token' });
      this.usuarioService.Quien(value!).then((res)=>{
        this.cursosServices.allCursos(res.data).then((res)=>{
          this.cursos=res
        })
      })
    }
  }




onChangeCurso(event:any) {
  this.cursoSeleccionado = event.target.value;
  this.seccionesServices.allCursos(this.cursoSeleccionado).then((res)=>{
    this.secciones=res
  })
}

Crear(){
/**
  const formulario = new FormData();
  if (this.archivosSeleccionados) {
    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      formulario.append(`file_${i}`, this.archivosSeleccionados[i]);
    }
    // Llamar al método Create del servicio fileService con el objeto FormData completo
    this.fileService.Create(formulario).then((res) => {
      console.log(res);
      // Aquí puedes manejar la respuesta del backend si es necesario
    }).catch((error) => {
      console.error(error);
      // Aquí puedes manejar los errores si es necesario
    });
  }
*/

  if (this.archivosSeleccionados) {
    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      this.fileService.Create(this.archivosSeleccionados[i]).then((res)=>{
      })
    }
  }


  if(this.publicacion.nombre!=null && this.publicacion.descripcion!=null && this.publicacion.tipo!=null && this.publicacion.comentarios!=null && this.publicacion.seccionId!=null && this.publicacion.cursoId!=null){
    this.publicacion.fechaCreacion= new Date();
    this.publicacion.cursoId=this.cursoSeleccionado
    this.publicacion.comentarios=Boolean(this.publicacion.comentarios)
    this.publicacionServices.Create(this.publicacion).then((res)=>{
      if(res==200){
        this.alerta("success","Crear","Curso guardado correctamente.")
        this.publicacion=new Publicacion()
      }else{
        this.alerta("error","Error","Error en el servidor, intenta más tarde")
      }
    })
  }else{
    this.alerta("error","Error","Verifica los campos, debes completar todo el formulario.")
  }

}


archivos(event: any) {
  this.imagenesPrevisualizadas = [];
  this.archivosSeleccionados = event.target.files;
/*
  // Llamar a mostrarArchivo() solo si hay archivos seleccionados
  if (this.archivosSeleccionados) {
    // Iterar sobre los archivos seleccionados
    for (let i = 0; i < this.archivosSeleccionados.length; i++) {
      const file = this.archivosSeleccionados[i];
      const fileURL = URL.createObjectURL(file);
      // Comprobar el tipo de archivo
      if (file.type.startsWith('image/')) {
        // Es una imagen
      //  this.mostrarImagen(file);
        this.imagenesPrevisualizadas.push(fileURL)
      } else if (file.type.startsWith('video/')) {
        // Es un video
      //  this.mostrarVideo(file);
      this.imagenesPrevisualizadas.push(fileURL)
      } else {
        this.imagenesPrevisualizadas.push(fileURL)
        // Mostrar el nombre del archivo en la interfaz de usuario
     //  this.mostrarNombreArchivo(file)
      }
    }

  }
  */
}

/*
mostrarImagen(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileDataURL = e.target?.result as string;
    console.log(fileDataURL);
    this.imagenesPrevisualizadas.push(fileDataURL);
  };
  reader.readAsDataURL(file);
}
mostrarVideo(file: File) {
  const reader = new FileReader();
  reader.onload = (e) => {
    const fileDataURL = e.target?.result as string;
    console.log(fileDataURL);
    // Agregar el video a la interfaz de usuario
    // Por ejemplo, podrías tener un elemento <video> en tu HTML y asignar la URL al atributo src
    // Ejemplo: this.videoURL = fileDataURL;
  };
  reader.readAsDataURL(file);
}

mostrarNombreArchivo(file: File) {
  console.log('Nombre del archivo: ' + file.name);
  // Aquí puedes agregar lógica para mostrar el nombre del archivo en la interfaz de usuario
}
*/
eliminarImagen(index: number) {
  this.imagenesPrevisualizadas.splice(index, 1);
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


