import { Injectable } from "@angular/core";

@Injectable({
  'providedIn':'root'
})
export class ApiConfig {
  localURL = {
    url : 'http://localhost:3000/'
  };

  apiURL = this.localURL.url;

  serviceName_REGISTRATION = 'user/register';
  serviceName_LOGIN = 'user/login';
}
