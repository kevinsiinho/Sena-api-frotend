import { Comentar } from "../comentar/comentar"

export class Publicacion {
  id?:string
  nombre!:string
  descripcion!:string
  comentarios!:boolean
  cursoId!:string
  seccionId!:string
  tipo?:string
  fechaCreacion!:Date
  Observaciones:Comentar[]=[]
  SetValues(item:any){
    this.id=item.id
    this.nombre=item.nombre
    this.descripcion=item.descripcion
    this.comentarios=item.comentarios
    this.tipo=item.tipo
    this.cursoId=item.cursoId
    this.seccionId=item.seccionId
    this.fechaCreacion=item.fechaCreacion
    this.Observaciones=item.Observaciones
  }
}
