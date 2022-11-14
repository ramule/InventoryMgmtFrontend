import { Injectable } from "@angular/core";
import { ApiConfig } from "src/app/api.config";
import { HttpService } from "./http-api.service";

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private httpService: HttpService, private apiConfig: ApiConfig) {}

  getIdToken() {
    return sessionStorage.getItem('X-Token');
  }

  refreshAccessToken() {
    let reqParams = {
      "email": "rmule1996@gmail.com",
      "password": "ravi1234",
      "refreshtoken": sessionStorage.getItem('refreshToken')
    };
    return this.httpService.post(this.apiConfig.serviceName_REFRESH_TOKEN, reqParams)
  }

  storeSessionDetails(token: any) {
    sessionStorage.setItem('X-Token', token);
  }
}
