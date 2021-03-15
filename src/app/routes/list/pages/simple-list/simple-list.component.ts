
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BixiPaginationListBase, EColType, ICol } from '@bixi/core/table';
import { BixiACService } from '@bixi/ac';
import { IDoc } from '@routes/list/models';
import { DocService } from '@routes/list/services';
import { IFilterCol } from '@bixi/core/filter';

@Component({
  selector: 'list-simple-list-page',
  templateUrl: './simple-list.component.html'
})
export class SimpleListPageComponent extends BixiPaginationListBase implements OnInit {
  filterParams = {
    keyword: null,
    created_at: null
  };

  dialogs = {
    edit: {
      visible: false,
      doc: null
    }
  };

  rows: IDoc[] = [];
  cols: (ICol & IFilterCol)[] = [{
    name: this.i18n.instant('list.doc_name'),
    key: 'name',
    type: EColType.link,
    target: '_blank',
    href(val: string) {
      return `http://bixi.datagrand.com?doc=${val}`;
    }
  }, {
    name: this.i18n.instant('list.doc_desc'),
    key: 'desc'
  }, {
    name: this.i18n.instant('created_at'),
    key: 'created_at',
    type: EColType.time,
    width: '160px',
    sort: {
      key: 'created_at'
    }
  }, {
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
        onClick: (doc: IDoc) => {
          this.onEditDoc(doc);
        }
      }, {
        name: this.i18n.instant('delete')
      }];
    }
  }
  ];

  constructor(
    private docService: DocService,
    public acService: BixiACService,
    private i18n: TranslateService
  ) {
    super();
  }

  onSearch() {
    this.loading = true;
    this.docService.getDocList(this.pagination, this.filterParams)
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

  onEditDoc(doc?: IDoc) {
    this.dialogs = {
      ...this.dialogs,
      edit: {
        doc,
        visible: true
      }
    };
  }
}
