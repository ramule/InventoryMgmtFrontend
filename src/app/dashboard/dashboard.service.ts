import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor() { }

  logoutRequest(formData: any) {
    let reqBody = {
      "email": formData.email,
      "password": formData.password
    }
    return reqBody;
  }
}
