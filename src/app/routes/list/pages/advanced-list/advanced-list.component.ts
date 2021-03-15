
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ICol, IPagination, EColType, EStatus, EProgressStatus } from '@bixi/core/table';
import { EStrategy, IFilterCol } from '@bixi/core/filter';
import { BixiACService } from '@bixi/ac';
import { ITask } from '@routes/list/models';
import { TaskService } from '@routes/list/services';
import { Router } from '@angular/router';

@Component({
  selector: 'list-advanced-list-page',
  templateUrl: './advanced-list.component.html'
})
export class AdvancedListPageComponent implements OnInit {
  loading = false;
  pagination: IPagination = {
    page: 1,
    pageSize: 10,
    total: 0
  };
  filterParams = {
    keyword: null,
    created_at: null
  };
  strategies = [EStrategy.onEnter];
  selectedKeys: string[] = [];

  rows: ITask[] = [];
  cols: (ICol & IFilterCol)[] = [
    {
      key: 'id',
      type: EColType.checkbox,
      filterOptions: {
        disabled: true
      },
      name: this.i18n.instant('list.checkbox'),
      selectionList: [
        {
          text: this.i18n.instant('list.select_this_page'),
          onSelect: () => {
            this.selectedKeys = this.rows.map(r => r.id);
          }
        },
        {
          text: this.i18n.instant('list.select_all'),
          onSelect: () => {
            this.selectedKeys = this.rows.map(r => r.id);
          }
        }
      ]
    },
    {
      name: this.i18n.instant('list.task_name'),
      key: 'name',
      type: EColType.link
    }, {
      name: this.i18n.instant('list.app'),
      key: 'app',
      type: EColType.link,
      target: '_blank',
      href(val: string, row: ITask) {
        return row.app_link;
      }
    }, {
      name: this.i18n.instant('list.robot'),
      key: 'robot',
      titleTipContent: this.i18n.instant('list.robot_desc')
    }, {
      name: this.i18n.instant('created_at'),
      key: 'created_at',
      type: EColType.time,
      sort: {
        key: 'created_at'
      }
    }, {
      name: this.i18n.instant('created_by'),
      key: 'created_by'
    }, {
      name: this.i18n.instant('list.task_progress'),
      key: 'progress',
      type: EColType.progress,
      status: (val) => {
        if (val === 0) {
          return EProgressStatus.starting;
        }
        if (val === 1) {
          return EProgressStatus.success;
        }
        return EProgressStatus.processing;
      }
    }, {
      name: this.i18n.instant('status'),
      key: 'status',
      type: EColType.status,
      width: '160px',
      options: [
        {
          type: EStatus.default,
          value: 0,
          text: this.i18n.instant('list.task_status_0')
        }, {
          type: EStatus.processing,
          value: 1,
          text: this.i18n.instant('list.task_status_1')
        }, {
          type: EStatus.success,
          value: 2,
          text: this.i18n.instant('list.task_status_2')
        }
      ]
    },
    {
      name: this.i18n.instant('operations'),
      key: 'operations',
      type: EColType.operations,
      width: '160px',
      filterOptions: {
        disabled: true
      },
      operations: () => {
        return [{
          name: this.i18n.instant('edit'),
          onClick: (task: ITask) => {
            this.router.navigate(['/form/basic-form'], {
              queryParams: {
                id: task.id
              }
            });
          }
        }, {
          name: this.i18n.instant('delete')
        }];
      }
    }
  ];

  constructor(
    private taskService: TaskService,
    public acService: BixiACService,
    private i18n: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getTaskList();
  }

  getTaskList() {
    if (this.loading) return;
    this.loading = true;
    this.taskService.getTaskList(this.pagination, this.filterParams)
      .subscribe((res) => {
        this.pagination = {
          ...this.pagination,
          total: res.total
        };
        this.rows = res.items;
        this.loading = false;
      }, () => {
        this.loading = false;
      });
  }
}
