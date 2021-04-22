import { Component, OnInit } from '@angular/core';
import { IGoodsType } from '@routes/goods/models';
import { EOperation } from '@routes/warehouse/models';
import { DownloadService } from '@utils';
import { DateCleanType, DateTimeService } from '@utils/date-time.service';
import { GoodsService, WarehouseService } from 'src/app/api/services';

interface IStoreHistory {
  goods_id: number;
  goods_name: string;
  operation: number;
  num: number;
  date: string;
}

@Component({
  selector: 'app-store-history',
  templateUrl: './store-history.component.html',
  styleUrls: ['./store-history.component.less']
})
export class StoreHistoryComponent implements OnInit {
  showFilter = false;
  EOperation = EOperation;
  query = {
    word: '',
    dateRange: [],
    operation: null,
    type_id: null
  };
  storeList: IStoreHistory[] = [];
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  operationMap = {
    0: '采购入库',
    1: '赠送入库',
    2: '盘盈入库',
    3: '出库'
  };
  defaultRanges = {
    今天: [this.dateTimeService.getDay(0), this.dateTimeService.getDay(0)],
    昨天: [this.dateTimeService.getDay(-1), this.dateTimeService.getDay(-1)],
    最近七天: [this.dateTimeService.getDay(-7), this.dateTimeService.getDay(0)]
  };
  typeList: IGoodsType[] = [];

  constructor(
    private wmsService: WarehouseService,
    private dateTimeService: DateTimeService,
    private downloadService: DownloadService,
    private goodsService: GoodsService
  ) {}

  ngOnInit(): void {
    this.getList();
    this.getTypeList();
  }

  getTypeList(): void {
    this.goodsService
      .getApiGoodsList({
        page_index: '1',
        page_size: '1000',
        word: ''
      })
      .subscribe((res) => {
        this.typeList = res.data.items;
      });
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseHistory({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word,
        start_date: this.query.dateRange[0]
          ? this.dateTimeService.dateClean(this.query.dateRange[0], DateCleanType.Min)
          : '',
        end_date: this.query.dateRange[1]
          ? this.dateTimeService.dateClean(this.query.dateRange[1], DateCleanType.Max)
          : '',
        type: this.query.operation,
        type_id: this.query.type_id
      })
      .subscribe((res) => {
        this.storeList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  clear(): void {
    this.query = {
      word: '',
      dateRange: [],
      operation: null,
      type_id: null
    };
  }

  download(): void {
    this.wmsService
      .getApiWarehouseHistoryDownload({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word,
        start_date: this.query.dateRange[0]
          ? this.dateTimeService.dateClean(this.query.dateRange[0], DateCleanType.Min)
          : '',
        end_date: this.query.dateRange[1]
          ? this.dateTimeService.dateClean(this.query.dateRange[1], DateCleanType.Max)
          : '',
        type: this.query.operation,
        type_id: this.query.type_id
      })
      .subscribe((res) => {
        this.downloadService.downloadFile(res.data.url, '明细表');
      });
  }
}
