import { Injectable } from '@angular/core';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
import { environment } from '../../../environments/environment.prod';
import { Login } from '../../class/login/login';
@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public url = environment.url

  constructor() { }

  async Login(login:Login){
    const options = {
      url: this.url+'users/login/',
      headers: { "Content-Type": "application/json" },
      data: login
    };

  const response: HttpResponse = await CapacitorHttp.post(options);
   return response
  }

}
