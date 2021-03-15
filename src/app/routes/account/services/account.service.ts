import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AccountService {
  constructor(
    public $http: HttpClient
  ) { }
}
