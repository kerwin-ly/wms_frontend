import { Component, OnInit } from '@angular/core';
import { DRAWER_STYLE } from '@constants';
import { IGoodsType } from '@routes/goods/models';
import { StoreInDetailComponent } from '@routes/warehouse/components/store-in-detail/store-in-detail.component';
import { EStoreIn, IStoreInItem } from '@routes/warehouse/models';
import { DownloadService } from '@utils';
import { DateCleanType, DateTimeService } from '@utils/date-time.service';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalService } from 'ng-zorro-antd/modal';
import { GoodsService, WarehouseService } from 'src/app/api/services';

@Component({
  selector: 'app-store-in',
  templateUrl: './store-in.component.html',
  styleUrls: ['./store-in.component.less']
})
export class StoreInComponent implements OnInit {
  query = {
    word: '',
    dateRange: [],
    inType: null,
    type_id: null
  };
  defaultRanges = {
    今天: [this.dateTimeService.getDay(0), this.dateTimeService.getDay(0)],
    昨天: [this.dateTimeService.getDay(-1), this.dateTimeService.getDay(-1)],
    最近七天: [this.dateTimeService.getDay(-7), this.dateTimeService.getDay(0)]
  };
  showFilter = false;
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  storeList: IStoreInItem[] = [];
  inTypeMap = {
    purchase: '采购入库',
    gift: '赠送入库',
    surplus: '盘盈入库'
  };
  EStoreIn = EStoreIn;
  typeList: IGoodsType[] = [];

  constructor(
    private wmsService: WarehouseService,
    private dateTimeService: DateTimeService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private drawerService: NzDrawerService,
    private downloadService: DownloadService,
    private goodsService: GoodsService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.getTypeList();
  }

  getTypeList(): void {
    this.goodsService
      .getApiGoodsTypeList({
        page_index: '1',
        page_size: '1000',
        word: ''
      })
      .subscribe((res) => {
        this.typeList = res.data.items;
      });
  }

  showStoreIn(): void {
    const drawerRef = this.drawerService.create({
      nzTitle: '入库信息',
      nzContent: StoreInDetailComponent,
      nzFooter: null,
      nzWidth: 720,
      nzBodyStyle: DRAWER_STYLE
    });
    drawerRef.afterClose.subscribe((isRefresh: boolean) => {
      if (!isRefresh) return;
      this.getList(true);
    });
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseInList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        start_date: this.query.dateRange[0]
          ? this.dateTimeService.dateClean(this.query.dateRange[0], DateCleanType.Min)
          : '',
        end_date: this.query.dateRange[1]
          ? this.dateTimeService.dateClean(this.query.dateRange[1], DateCleanType.Max)
          : '',
        word: this.query.word,
        in_type: this.query.inType,
        type_id: this.query.type_id
      })
      .subscribe((res) => {
        this.storeList = res.data.items;
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

  clear(): void {
    this.query = {
      word: '',
      dateRange: [],
      inType: null,
      type_id: null
    };
  }

  download(): void {
    this.wmsService
      .getApiWarehouseInDownload({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        start_date: this.query.dateRange[0]
          ? this.dateTimeService.dateClean(this.query.dateRange[0], DateCleanType.Min)
          : '',
        end_date: this.query.dateRange[1]
          ? this.dateTimeService.dateClean(this.query.dateRange[1], DateCleanType.Max)
          : '',
        word: this.query.word,
        in_type: this.query.inType,
        type_id: this.query.type_id
      })
      .subscribe((res) => {
        this.downloadService.downloadFile(res.data.url, '入库列表');
      });
  }
}
