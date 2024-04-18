import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';
import { Cursos } from '../../class/cursos/cursos';
import { environment } from '../../../environments/environment.prod';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  public curso= new Cursos()
  public cursos:Cursos[]=[]
  public url= environment.url


  constructor() { }

  async Create(curso:Cursos){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:curso
    };
    const response: HttpResponse = await CapacitorHttp.post(options);
    return response
  };

  async all():Promise<any>{
    this.cursos=[]
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

  const response: HttpResponse = await CapacitorHttp.get(options);
        response.data.forEach((item:any)=> {
          this.curso=new Cursos();
          this.curso.Setvalues(item)
          this.cursos.push(this.curso)
        });
        return this.cursos
  }

  async Uno(id:string){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };

    const response: HttpResponse = await CapacitorHttp.get(options);
    return response.data
  }

  async allCursos(id:string):Promise<any>{
    this.cursos=[]
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos?filter=%7B%0A%20%20%22where%22%3A%20%7B%0A%20%20%20%20%22creadorId%22%3A%20%22'+id+'%22%0A%20%20%7D%0A%7D',
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      }
    };
        const response: HttpResponse = await CapacitorHttp.get(options);
        return response.data
  }

  async Update(curso:Cursos){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos/'+curso.id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      data:curso
    };
        const response: HttpResponse = await CapacitorHttp.put(options);
        return response.status;
  }

  async Delete(id:String){
    const { value } = await Preferences.get({ key: 'token' });
    const options = {
      url: this.url+'cursos/'+id,
      headers: { "Content-Type": "application/json",
      "Authorization": 'Bearer ' + value
      },
      };
    const response: HttpResponse = await CapacitorHttp.delete(options);
    return response.status
  };
}
