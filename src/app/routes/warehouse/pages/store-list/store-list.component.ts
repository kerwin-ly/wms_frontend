import { Component, OnInit } from '@angular/core';
import { IGoodsType } from '@routes/goods/models';
import { BatchComponent } from '@routes/warehouse/components/batch/batch.component';
import { IStoreInItem, IStoreItem, MOperation } from '@routes/warehouse/models';
import { NzDrawerService } from 'ng-zorro-antd/drawer';
import { GoodsService, WarehouseService } from 'src/app/api/services';

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
    word: '',
    type_id: null
  };
  storeList: IStoreItem[] = [];
  showFilter = false;
  batchList: IStoreInItem[] = [];
  typeList: IGoodsType[] = [];

  constructor(
    private wmsService: WarehouseService,
    private drawerService: NzDrawerService,
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

  clear(): void {
    this.query = {
      word: '',
      type_id: null
    };
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word,
        type_id: this.query.type_id
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
      nzWidth: 820
    });
  }
}
