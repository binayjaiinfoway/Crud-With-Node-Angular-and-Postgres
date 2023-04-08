import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, switchMap, tap} from 'rxjs';
import { Router } from '@angular/router';
import { FormserviceService } from './services/formservice.service';

@Injectable()
export class LogininterceptorInterceptor implements HttpInterceptor {

  constructor(private router:Router,private svc :FormserviceService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = localStorage.getItem('token');

    if (accessToken && request.url.indexOf('/login')===-1) {
     

      request = request.clone({
        setHeaders: {
          "authorization": `Bearer ${accessToken}`
        }
      })
 
    }
    return next.handle(request)
    .pipe(
      catchError(error => {
        if (error.status === 401) {
          // handle error
         
          this.svc.PostLogin({type:'token', refreshtoken:localStorage.getItem('refreshtoken')}).subscribe((data:any)=>{

            localStorage.setItem("token", data.data.token);
            localStorage.setItem("refreshtoken", data.data.refreshtoken)
            request = request.clone({
              setHeaders: {
                "authorization": `Bearer ${data.data.token}`
              }
            })

            // location.reload()

          })
        }
        return next.handle(request)

      })
   );


}
}
