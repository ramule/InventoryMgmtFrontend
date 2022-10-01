import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginRequest(formData: any) {
    let reqBody = {
      "email": formData.email,
      "password": formData.password
    }
    return reqBody;
  }
}
