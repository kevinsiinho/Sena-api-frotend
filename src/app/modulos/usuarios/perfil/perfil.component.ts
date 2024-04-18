import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import Swal from 'sweetalert2';
import { Usuarios } from '../../../class/usuarios/usuarios';
import { UsuariosService } from '../../../servicios/usuarios/usuarios.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.sass']
})
export class PerfilComponent implements OnInit {

  public usuario = new Usuarios()
  public mensaje=""
  public alerta!:boolean
  public password:string=""
  public password2:string=""
  public btnPassword=false

  constructor(
    public usuarioServices:UsuariosService,
    public link:Router,
  ) { }

async  ngOnInit(){
    if(await this.usuarioServices.Verificar()){
      const { value } = await Preferences.get({ key: 'token' });
        this.usuarioServices.Quien(value!).then((res)=>{
        this.usuarioServices.InfoUsuarios(res.data).then((data)=>{
          this.usuario=data
        })
      })
    }
  }

  Actualizar(){
    this.usuarioServices.Update(this.usuario).then((res)=>{
      console.log(this.usuario)
      if(res===204){
        this.alerta=true
        this.mensaje="Datos actualizados!"
      }else{
        this.alerta=false
        this.mensaje="Error en el servidor, intenta más tarde."
      }
    })
  }

  MostrarInputsPassword(){
    !this.btnPassword? this.btnPassword=true:this.btnPassword=false;
  }

  UpdatePassword(){
    if(this.password!="" && this.password2!=""){
        if(this.password===this.password2){
          this.usuarioServices.UpdatePassword(this.usuario.id,this.password2).then((res)=>{
            if(res==204){
              this.alerta=true
              this.mensaje="La contraseña ha sido modificada."
              this.usuarioServices.salir()
            }else{
              this.alerta=false
              this.mensaje="Error en el servidor, intenta más tarde"
            }
          })
        }else{
          this.alerta=false
          this.mensaje="Las contraseñas no coinciden"
        }
    }else{
      this.alerta=false
      this.mensaje="Verifica los campos de las contraseñas."
    }
  }

  EliminarUsuario(){
    Swal.fire({
      title: "¿Estás seguro de querer eliminar tu cuenta?",
      text: "Si eliminar tu cuenta perderás el acceso al sitio.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Sí, eliminar!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.usuarioServices.DeletePassword(this.usuario.id).then((res)=>{
          if(res==204){
              this.usuarioServices.DeleteUsuarios(this.usuario.id).then((res)=>{
                if(res==204){
                  Swal.fire({
                    title: "Eliminada!",
                    text: "Tu cuenta ha sido eliminada.",
                    icon: "success"
                  });
                  this.usuarioServices.salir()
                }else{
                  this.alerta=false
                  this.mensaje="Error en el servidor, intenta más tarde"
                }
              })
          }else{
            this.alerta=false
            this.mensaje="Error en el servidor, intenta más tarde"
          }
        })
      }
    });
  }

}
