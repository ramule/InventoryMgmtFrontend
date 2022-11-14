import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ApiConfig } from '../api.config';
import { HttpService } from '../services/common-services/http-api.service';
import { DashboardService } from './dashboard.service';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  usersArr: any = [];
  constructor(private httpService: HttpService, public apiConfig: ApiConfig, private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.getUsersApiCall();
  }

  getUsersApiCall() {
    let loginObservable = this.httpService.get<HttpResponse<any>>(this.apiConfig.serviceName_GETUSERS);
    loginObservable.subscribe((response: any) => {
      console.log(response.responseData);
      let tempArr = JSON.parse(response.responseData);
      this.usersArr = tempArr.usersData;

    });
  }

  logout() {
    // let params = this.dashboardService.logoutRequest(this.loginForm.value);
    // let loginObservable = this.httpService.post<HttpResponse<any>>(this.apiConfig.serviceName_LOGIN, params);
    // loginObservable.subscribe((data) => {

    //   this.router.navigateByUrl('/dashboard');
    // });
  }

}
