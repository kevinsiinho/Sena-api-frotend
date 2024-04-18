import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { environment } from '../../../environments/environment.prod';
import { Usuarios } from '../../class/usuarios/usuarios';
@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  public url = environment.url
  public usuarios:Usuarios[]=[];
  public usuario= new Usuarios()
  constructor(public link:Router) { }


  async Create(Usuarios:Usuarios){
    const options = {
      url: this.url+'signup',
      headers: { "Content-Type": "application/json" },
      data: Usuarios
      };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status
  };

  async Quien(token:string){
    const options = {
      url: this.url+'whoAmI',
      headers: { "Content-Type": "application/json",
                  "Authorization": 'Bearer ' + token
               }
    };
    const response: HttpResponse = await CapacitorHttp.get(options);
    return response
  }

  async Update(usuario:Usuarios){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'user/'+usuario.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:usuario
    };
  const response: HttpResponse = await CapacitorHttp.put(options);
        return response.status;
  }

  async InfoUsuarios(id:string){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'whoAmI'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
  }

  async UpdatePassword(id:string, password:string){

    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'user/'+id+"/password",
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:{password:password}
    };
        const response: HttpResponse = await CapacitorHttp.put(options);
        return response.status;
  }

  async DeleteUsuarios(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'user/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.status
  };

  async DeletePassword(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'user/credenciales/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.status
  };


  async salir(){
    await Preferences.remove({ key: 'token' });
    this.link.navigate(['/login'])
  }

  async Verificar(){
    const { value } = await Preferences.get({ key: 'token' });
    if(!value){
      this.link.navigate(['/login'])
      return false
      }
      return true
    };

/*
  async allUsuarios():Promise<any>{
    this.Usuarioss=[]
    const options = {
      url: this.url+'/signup'
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
    console.log(response.data)
        response.data.forEach((item:any)=> {
          this.Usuarios=new Usuarios();
          this.Usuarios.SetValues(item)
          this.Usuarioss.push(this.Usuarios)
        });
        return this.Usuarioss
  }


    async buscar(event:string){
      const query = event;
      //event.target.value
      const { value } = await Preferences.get({ key: 'token' });
      const options = {
        url: this.url+'/Usuarioss/search?query='+query,
        headers: { "Content-Type": "application/json",
        "Authorization": 'Bearer ' + value
        }
      };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
    }

*/
}
