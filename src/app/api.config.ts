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
  serviceName_REFRESH_TOKEN = 'user/refresh-token';
  serviceName_LOGOUT = 'user/logout';
  serviceName_GETUSERS = 'user/getUsers';
}
