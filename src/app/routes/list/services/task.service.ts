import { mapValues, toString } from 'lodash-es';
import { IList } from '@models';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITask } from '../models';
import { IFilterParams, IPagination } from '@bixi/core/table';

@Injectable()
export class TaskService {
  constructor(
    public $http: HttpClient
  ) { }

  getTaskList(pagination: IPagination, params: IFilterParams) {
    return this.$http.get<IList<ITask>>('api/tasks', {
      params: mapValues({
        ...pagination,
        ...params
      }, toString)
    });
  }

  updateTask(task: Partial<ITask>) {
    if (task.id) {
      return this.$http.patch(`api/tasks/${task.id}`, task);
    }
    return this.$http.post('api/tasks', task);
  }
}
