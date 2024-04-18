import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Archivos } from '../../class/archivos/archivos';
import { environment } from '../../../environments/environment.prod';


@Injectable({
  providedIn: 'root'
})
export class FileService {

  public archivo= new Archivos()

  public url= environment.url

  constructor() { }

  async Create(formulario: FormData) {
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url + 'files',
      headers: {
        "Content-Type": "multipart/form-data",
        "Authorization": 'Bearer ' + value
      },
      data: formulario  // Envía FormData en lugar de un archivo directamente
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response.status;
  };

  async Uno(id:string){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'file/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
  }
}
