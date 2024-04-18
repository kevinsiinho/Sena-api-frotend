import { Cursos } from "../cursos/cursos"

export class Usuarios {

    tipoid!: string
    id!: string
    nombres!: string
    apellidos!: string
    password!: string
    email!: string
    tipoCuenta!: string
    cursos:String[]=[];
    SetValues(item:any){
      this.id=item.id
      this.tipoid=item.tipoid
      this.nombres=item.nombres
      this.apellidos=item.apellidos
      this.email=item.email
      this.tipoCuenta=item.tipoCuenta
      this.password=item.password
      this.cursos=item.cursos
    }
}
