import { Component, OnInit } from '@angular/core';
import { EOperation } from '@routes/warehouse/models';
import { DateCleanType, DateTimeService } from '@utils/date-time.service';
import { WarehouseService } from 'src/app/api/services';

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
    operation: null
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

  constructor(private wmsService: WarehouseService, private dateTimeService: DateTimeService) {}

  ngOnInit(): void {
    this.getList();
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
        type: this.query.operation
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
      operation: null
    };
  }
}
