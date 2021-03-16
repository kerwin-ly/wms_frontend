import { Component, OnInit } from '@angular/core';
import { BatchComponent } from '@routes/warehouse/components/batch/batch.component';
import { IStoreInItem, IStoreItem } from '@routes/warehouse/models';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { WarehouseService } from 'src/app/api/services';

@Component({
  selector: 'app-store-list',
  templateUrl: './store-list.component.html',
  styleUrls: ['./store-list.component.less']
})
export class StoreListComponent implements OnInit {
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  query = {
    word: ''
  };
  storeList: IStoreItem[] = [];
  showFilter = false;
  batchList: IStoreInItem[] = [];

  constructor(private wmsService: WarehouseService, private drawerService: NzDrawerService) {}

  ngOnInit(): void {
    this.getList();
  }

  clear(): void {
    this.query.word = '';
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word
      })
      .subscribe((res) => {
        this.storeList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  showBatchModal(id: number): void {
    this.drawerService.create({
      nzTitle: '批次详情',
      nzContent: BatchComponent,
      nzContentParams: {
        goodsId: id
      },
      nzFooter: null,
      nzWidth: 720
    });
  }
}
