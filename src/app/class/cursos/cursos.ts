import { Secciones } from "../secciones/secciones"
import { Usuarios } from "../usuarios/usuarios"

export class Cursos {
  id?:string
  nombre!:string
  descripcion!:string
  estado!:string
  fechaCreacion!:Date
  fechaActualizacion!:Date
  imagen!:string
  creadorId!:string
  participantes:string[]=[]
  secciones:string[]=[]

  Setvalues(item:any){
    this.id=item.id
    this.nombre=item.nombre
    this.descripcion=item.descripcion
    this.estado=item.estado
    this.fechaCreacion=item.fechaCreacion
    this.fechaActualizacion=item.fechaActualizacion
    this.imagen=item.imagen
    this.creadorId=item.creadorId
    this.participantes=item.participantes
    this.secciones=item.secciones
  }

}
