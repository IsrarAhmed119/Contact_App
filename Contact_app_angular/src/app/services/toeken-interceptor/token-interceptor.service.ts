import { Injectable, Injector } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { UserService } from './../userServices/user.service';

@Injectable({
  providedIn: 'root',
})
export class TokenInterceptorService implements HttpInterceptor {
  tokenizedReq;

  constructor(private injector: Injector) {}

  handleError(error: HttpErrorResponse) {
    // console.log("TokenInterceptorService_error_occured---->>");
    return throwError(error);
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    let authService = this.injector.get(UserService);
    // console.log('token-interceptor_call---->>');

    if (req.body instanceof FormData) {
      // console.log('FormData_token-interceptor_call---->>');

      this.tokenizedReq = req.clone({
        setHeaders: {
          Authorization: `${authService.getToken()}`,
        },
      });
    } else {
      this.tokenizedReq = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `${authService.getToken()}`,
          // Authorization: authService.getToken(),
        },
      });
    }

    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/json',
    //   Authorization: `${authService.getToken()}`,
    //   // Authorization: authService.getToken(),
    // });

    // const clone = req.clone({
    //   headers: headers,
    // });
    return next
      .handle(this.tokenizedReq)
      .pipe(retry(2), catchError(this.handleError));
  }
}
