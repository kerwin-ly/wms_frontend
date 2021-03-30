import { Component, OnInit } from '@angular/core';
import { DRAWER_STYLE } from '@constants';
import { OutBatchComponent } from '@routes/warehouse/components/out-batch/out-batch.component';
import { StoreOutDetailComponent } from '@routes/warehouse/components/store-out-detail/store-out-detail.component';
import { IStoreOutItem } from '@routes/warehouse/models';
import { DateCleanType, DateTimeService } from '@utils/date-time.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { WarehouseService } from 'src/app/api/services';

@Component({
  selector: 'app-store-out',
  templateUrl: './store-out.component.html',
  styleUrls: ['./store-out.component.less']
})
export class StoreOutComponent implements OnInit {
  showFilter = false;
  query = {
    word: '',
    dateRange: []
  };
  defaultRanges = {
    今天: [this.dateTimeService.getDay(0), this.dateTimeService.getDay(0)],
    昨天: [this.dateTimeService.getDay(-1), this.dateTimeService.getDay(-1)],
    最近七天: [this.dateTimeService.getDay(-7), this.dateTimeService.getDay(0)]
  };
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  storeOutList: IStoreOutItem[] = [];

  constructor(
    private wmsService: WarehouseService,
    private dateTimeService: DateTimeService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private drawerService: NzDrawerService
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  clear(): void {
    this.query = {
      word: '',
      dateRange: []
    };
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseOutList({
        word: this.query.word,
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        start_date: this.query.dateRange[0]
          ? this.dateTimeService.dateClean(this.query.dateRange[0], DateCleanType.Min)
          : '',
        end_date: this.query.dateRange[1]
          ? this.dateTimeService.dateClean(this.query.dateRange[1], DateCleanType.Max)
          : ''
      })
      .subscribe((res) => {
        this.storeOutList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  delete(id: number): void {
    this.modalService.confirm({
      nzTitle: '确认删除该项？',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteRow(id),
      nzCancelText: '取消'
    });
  }

  deleteRow(id: number): void {
    this.wmsService.deleteApiWarehouseInId(id.toString()).subscribe((res) => {
      this.msg.success('删除成功');
      this.getList();
    });
  }

  showStoreOut(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: '出库信息',
      nzContent: StoreOutDetailComponent,
      nzFooter: null,
      nzWidth: 720,
      nzBodyStyle: DRAWER_STYLE
    });
    drawerRef.afterClose.subscribe((isRefresh: boolean) => {
      if (!isRefresh) return;
      this.getList(true);
    });
  }

  showModal(goods_id: number, out_code: string): void {
    this.drawerService.create({
      nzTitle: '出库批次',
      nzContent: OutBatchComponent,
      nzFooter: null,
      nzWidth: 720,
      nzBodyStyle: DRAWER_STYLE,
      nzContentParams: {
        goods_id,
        out_code
      }
    });
  }
}
