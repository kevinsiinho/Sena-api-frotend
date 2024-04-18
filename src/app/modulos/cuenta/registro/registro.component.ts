import { Component, OnInit } from '@angular/core';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.sass']
})
export class RegistroComponent implements OnInit {

  public usuarios:Usuarios[]=[];
  public usuario= new Usuarios()
  public password:string=""
  public checkbox:boolean=false
  public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  public mensaje:string=""
  public alerta!:boolean

  constructor(
    public usuarioService:UsuariosService,
    ) { }

  ngOnInit(): void {
  }


  nuevoUsuario(){
    if(this.usuario.tipoid!="" && this.usuario.id!="" && this.usuario.nombres!="" && this.usuario.apellidos!="" &&
    this.usuario.email!="" && this.usuario.tipoCuenta!="" && this.usuario.password!="" && this.password!="" && this.checkbox){
        if(this.emailPattern.test(this.usuario.email)){
          if("no correo existe"){
              if(this.password===this.usuario.password){
                if(this.password.length>5){
                  this.usuario.id=String(this.usuario.id)
                  this.usuario.email = this.usuario.email.toLowerCase();
                  this.usuarioService.Create(this.usuario).then((res)=>{
                    if(res==200){
                      this.alerta=true
                      this.mensaje="Usuario guardado."
                      this.password=""
                      this.usuario= new Usuarios()
                    }else{
                      this.alerta=false
                      this.mensaje="Error en el servidor, intenta más tarde"
                    }
                  })
                }else{
                  this.alerta=false
                  this.mensaje="La contraseña debe tener más de 5 caracteres"
                }
              }else{
                this.alerta=false
                this.mensaje="Las contraseñas no coinciden."
              }
          }else{
            this.alerta=false
            this.mensaje="El correo ingresado ya existe"
          }
        }else{
          this.alerta=false
          this.mensaje="Correo no valido."
        }
    }else{
      this.alerta=false
      this.mensaje="Revisa los campos."
    }
  }
}
