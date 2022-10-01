import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';
import { ApiConfig } from 'src/app/api.config';
@Injectable({
  'providedIn':'root'
})
export class HttpService {

  commonURL = this.appConfig.apiURL;
  constructor(private http: HttpClient, private router: Router, private appConfig: ApiConfig) {}

  get<T>(apiUrl: string) {
    const headers = new HttpHeaders({
        'Expires': '0',
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache',
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken(this.getTokenDetails())
    });
    const httpGet = this.http.get(this.commonURL + apiUrl, { headers: headers })
      .pipe(
          catchError(this.errorHandler.bind(this))
      );
    return httpGet;
  }

  post<T>(apiUrl: string, body: any) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken(this.getTokenDetails())
    });

    const httpPost = this.http.post(this.commonURL + apiUrl, body, { headers: headers })
      .pipe(
          catchError(this.errorHandler.bind(this))
      );
    return httpPost;
  }

  put(apiUrl: string, body: any) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken(this.getTokenDetails())
    });
    const httpPut = this.http.put(this.commonURL + apiUrl, body, { headers: headers })
      .pipe(
          catchError(this.errorHandler.bind(this))
      );
    return httpPut;
  }

  patch(apiUrl: string, body: any) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken(this.getTokenDetails())
    });
    const httpPatch = this.http.patch(this.commonURL + apiUrl, body, { headers: headers })
      .pipe(
          catchError(this.errorHandler.bind(this))
      );
    return httpPatch;
  }

  delete(apiUrl: string) {
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        // 'Authorization': this.getToken(this.getTokenDetails())
    });
    const httpDelete = this.http.delete(this.commonURL + apiUrl, { headers: headers })
      .pipe(
          catchError(this.errorHandler.bind(this))
      );
    return httpDelete;
  }

  errorHandler(res: any) {
    console.log("ErrorResponse: ", res);
    const error = res.error;
    const keys = Object.keys(error);
    const key = keys[0];
    let message = error[key];

    if(error[key] instanceof Array) {
      message = error[key][0];
    }

    if(key == "isTrusted") {

    }
    else {
      message = key + ": " + message;
    }

    console.log('Error: ', error);
    console.log('Message: ', message);
    return throwError({messages : message, error: res});
  }
}
