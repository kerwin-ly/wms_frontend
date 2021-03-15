import { Injectable, Injector } from '@angular/core';
import { Router } from '@angular/router';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpErrorResponse,
  HttpEvent,
  HttpResponseBase
} from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { AuthService } from '@services';
import { SpinService } from '@utils';
import { NzMessageService } from 'ng-zorro-antd/message';
// import { NzNotificationService } from 'ng-zorro-antd';

@Injectable()
export class DefaultInterceptor implements HttpInterceptor {
  constructor(private injector: Injector, private spinService: SpinService, private messageService: NzMessageService) {}

  // private get notification(): NzNotificationService {
  // 	return this.injector.get(NzNotificationService);
  // }

  private goTo(url: string) {
    // 清除 loading
    this.spinService.clearStatus();
    if (window.location.href.includes('passport/login')) {
      console.warn('已经在登陆页面了');
      return;
    }
    setTimeout(() => this.injector.get(Router).navigateByUrl(url));
  }

  throwError(errorRes: HttpErrorResponse): void {
    let msg = '发生未知错误!';
    if (errorRes.status === 504) {
      msg = '请求超时';
    } else if (errorRes.error && typeof errorRes.error.message === 'string') {
      msg = errorRes.error.message;
    }

    // 强制清除 loading
    this.spinService.clearStatus();
    // 提示错误信息
    this.messageService.error(msg);
    throw errorRes;
  }

  // tslint:disable-next-line: no-any
  private handleData(ev: any): Observable<any> {
    this.spinService.emit(false);
    switch (ev.status) {
      case 200: {
        if (ev.body.code === 401) {
          console.error('401 错误 -> 退出登录', ev);
          this.injector.get(AuthService).logout();
        }
        break;
      }
      case 500: {
        this.goTo(`/exception/${ev.status}`);
        break;
      }
      default: {
        if (ev instanceof HttpErrorResponse) {
          if (ev.error && ev.error.errorMsg && this.injector.get(NzMessageService)) {
            this.injector.get(NzMessageService).error(ev.error.errorMsg);
          }
          return throwError(ev);
        }
        break;
      }
    }
    return of(ev);
  }

  // tslint:disable-next-line: no-any
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // 统一加上服务端前缀
    let url = req.url;
    if (!url.startsWith('https://') && !url.startsWith('http://')) {
      if (!url.endsWith('json')) {
        url = environment.SERVER_URL + url;
      }
    }
    const newReq = req.clone({ url });
    return next.handle(newReq).pipe(
      // tslint:disable-next-line: no-any
      mergeMap((event: any) => {
        // 允许统一对请求错误处理
        if (event instanceof HttpResponseBase) {
          return this.handleData(event);
        }
        // 若一切都正常，则后续操作
        return of(event);
      }),
      catchError((err: HttpErrorResponse) => this.handleData(err))
    );
  }
}
