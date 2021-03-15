import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class SettingService {
  constructor(
    public $http: HttpClient
  ) { }
}
