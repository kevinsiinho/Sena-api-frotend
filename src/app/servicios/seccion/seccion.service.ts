import { R3SelectorScopeMode } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Secciones } from '../../class/secciones/secciones';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class SeccionService {

  public seccion= new Secciones()
  public secciones:Secciones[]=[]
  public url= environment.url


  constructor() { }

  async Create(seccion:Secciones){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:seccion
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status
  };

  async all():Promise<any>{
    this.secciones=[]
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response.data
  }

  async allCursos(id:string):Promise<any>{
    this.secciones=[]
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22cursoId%22%3A%20%22'+id+'%22%0A%20%20%7D%0A%7D',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response.data
  }

  async Uno(id:string){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
  }

  async Update(seccion:Secciones){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions/'+seccion.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:seccion
    };
        const response: HttpResponse = await CapacitorHttp.put(options);
        return response.status;
  }

  async Delete(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'seccions/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.status
  };
}
