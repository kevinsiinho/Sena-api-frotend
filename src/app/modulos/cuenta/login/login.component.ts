import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Preferences } from '@capacitor/preferences';
import { Login } from '../../../class/login/login';
import { LoginService } from '../../../servicios/login/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {

  public login= new Login()
  public token:string=""
  public mensaje=""
  public alerta!:boolean
  public emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  constructor(
    public loginService:LoginService,
    private link: Router,
  ) { }

  ngOnInit(): void {
  }

  verificar(){
    if(this.login.email!="" && this.login.password){
      if(this.emailPattern.test(this.login.email)){
        this.login.email = this.login.email.toLowerCase();
          this.loginService.Login(this.login).then(async (res)=>{
            if(res.status==200){
                await Preferences.set({
                key: 'token',
                value: res.data.token,
                });
                this.link.navigate(['/listar-cursos'])
                this.login=new Login()
            }else{
              this.alerta=false
              this.mensaje="Usuario no encontrado"
            }
          })
      }else{
        this.alerta=false
        this.mensaje="Correo no valido"
      }
    }else{
      this.alerta=false
      this.mensaje="Revisa los campos."
    }
  }

}
