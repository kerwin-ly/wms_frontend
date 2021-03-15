import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class PassportService {
  constructor(
    public $http: HttpClient
  ) {
  }

  login(params: { account: string, password: string}) {
    return this.$http.post<{
        token: string;
        user: {
          username: string;
          account: string;
        },
        permissions: string[]
      }>('login?_allow_anonymous=true', {
      ...params
    });
  }
}
