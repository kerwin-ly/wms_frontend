import { mapValues, toString } from 'lodash-es';
import { IList } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IDoc } from '../models';
import { IFilterParams, IPagination } from '@bixi/core/table';

@Injectable()
export class DocService {
  constructor(
    public $http: HttpClient
  ) { }

  getDocList(pagination: IPagination, params: IFilterParams) {
    return this.$http.get<IList<IDoc>>('api/docs', {
      params: mapValues({
        ...pagination,
        ...params
      }, toString)
    });
  }
}
