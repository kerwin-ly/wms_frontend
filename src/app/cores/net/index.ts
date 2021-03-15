import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DefaultInterceptor } from './default.interceptor';
import { SimpleInterceptor } from '@bixi/auth';
import { ResponseCodeInterceptor } from './response-code.interceptor';

export const NET_PROVIDES = [
  { provide: HTTP_INTERCEPTORS, useClass: SimpleInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: ResponseCodeInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true }
];
