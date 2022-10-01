import { Component, OnInit } from '@angular/core';
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  cookie: any;
  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.cookie = this.cookieService.get('jwt');
    console.log(this.cookie);
  }


}
