export class Secciones {
  id?:string
  nombre!:string
  posicion!:number
  fechaCreacion!:Date
  fechaActualizacion!:Date
  cursoId!:string
  SetValues(item:any){
    this.id=item.id
    this.nombre=item.nombre
    this.posicion=item.posicion
    this.fechaCreacion=item.fechaCreacion
    this.fechaActualizacion=item.fechaActualizacion
    this.cursoId=item.cursoId
  }
}
