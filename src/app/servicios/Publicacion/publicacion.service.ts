import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Publicacion } from '../../class/publicacion/publicacion';
import { environment } from '../../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class PublicacionService {

  public publicacion= new Publicacion()
  public publicaciones:Publicacion[]=[]
  public url= environment.url


  constructor() { }

  async Create(publicacion:Publicacion){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:publicacion
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status
  };

  async all():Promise<any>{
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response.data
  }

  async allSeccion(id:string):Promise<any>{
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22seccionId%22%3A%20%22'+id+'%22%0A%20%20%7D%0A%7D',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response.data
  }

  async allPublicacion(id:string):Promise<any>{
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22cursoId%22%3A%20%22'+id+'%22%0A%20%20%7D%0A%7D',
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
      url: this.url+'contenidos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
  }

  async Update(publicacion:Publicacion){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos/'+publicacion.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:publicacion
    };
        const response: HttpResponse = await CapacitorHttp.put(options);
        return response.status;
  }

  async Delete(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'contenidos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.status
  };
}
