import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpResponse } from '@angular/common/http';
import { HttpRequest } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http';
import { HttpEvent } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { SpinnerService } from '../services/spinner.service';

@Injectable()
export class CustomHttpInterceptor implements HttpInterceptor {
  constructor(private spinnerService: SpinnerService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.spinnerService.show();
    console.log("shown")

    return next.handle(req).pipe(
      tap(
        {
          next: (event) => {
            if (event instanceof HttpResponse) {
              this.spinnerService.hide();
            }
          },
          error: (err) => {
            this.spinnerService.hide()
          }
        }
        // (event: HttpEvent<any>) => {
        //   if (event instanceof HttpResponse) {
        //     this.spinnerService.hide();
        //   }
        // },
        // (error) => {
        //   this.spinnerService.hide();
        // }
      )
    );
  }
}
