import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS, HttpErrorResponse, HttpResponse, HttpEvent } from "@angular/common/http";
import { catchError, Observable, switchMap, throwError } from "rxjs";
import { ApiConfig } from "../api.config";
import { AuthService } from "../services/common-services/auth.service";
@Injectable({
  'providedIn': 'root'
})
export class UniversalAppInterceptor implements HttpInterceptor {
  private refreshTokenInProgress = false;
  constructor(private apiConfig: ApiConfig, private authService: AuthService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = sessionStorage.getItem("X-Token");
    req = req.clone({
      url:  req.url,
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(req).pipe(
      catchError((errorRes: HttpResponse<any>) => {
        if(errorRes.status != 401) {
          return throwError(errorRes);
        }

        if(!this.refreshTokenInProgress) {
          this.refreshTokenInProgress = true;

          return this.authService.refreshAccessToken().pipe(
            switchMap((data: any) => {
              let token: any = data.headers.get('X-Token');
              this.authService.storeSessionDetails(token);
              return next.handle(this.addAuthenticationToken(req));
            }),
            catchError((err: any) => {
              this.refreshTokenInProgress = false;
              return throwError(errorRes);
            })
          )
        }
        return throwError(errorRes);
      })
    );
  }

  addAuthenticationToken(request: any) {
    const accessToken = this.authService.getIdToken();
    if(!accessToken) {
      return request;
    }

    return request.clone({
      setHeaders: {
        Authorization: this.authService.getIdToken()
      }
    })
  }
}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: UniversalAppInterceptor, multi: true },
];
