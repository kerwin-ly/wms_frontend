import { Component, OnInit } from '@angular/core';
import { IGoods } from '@routes/goods/models';
import { EStoreIn, IStoreInItem } from '@routes/warehouse/models';
import { cloneDeep, isNull } from 'lodash-es';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GoodsService, WarehouseService } from 'src/app/api/services';

const STORE_IN_SCHEMA = {
  goods_id: null,
  price: null,
  in_num: null,
  in_type: null
};

@Component({
  selector: 'app-store-in-detail',
  templateUrl: './store-in-detail.component.html',
  styleUrls: ['./store-in-detail.component.less']
})
export class StoreInDetailComponent implements OnInit {
  storeInList: IStoreInItem[] = [];
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  query = {
    word: ''
  };
  goodsList: IGoods[] = [];
  EStoreIn = EStoreIn;

  constructor(
    private goodsService: GoodsService,
    private drawerRef: NzDrawerRef,
    private msg: NzMessageService,
    private wmsService: WarehouseService
  ) {}

  ngOnInit(): void {
    this.getGoodsList();
    this.addRow();
  }

  addRow(): void {
    const temp = cloneDeep(STORE_IN_SCHEMA);
    this.storeInList = [...this.storeInList, temp];
  }

  getGoodsList(word = ''): void {
    this.goodsService
      .getApiGoodsList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word
      })
      .subscribe((res) => {
        this.goodsList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  deleteRow(index: number): void {
    this.storeInList = this.storeInList.filter((_, i) => i !== index);
  }

  close(): void {
    this.drawerRef.close();
  }

  isValid(list: IStoreInItem[]): boolean {
    return list.every((item) => {
      for (const key in item) {
        if (isNull(item[key])) return false;
      }
      return true;
    });
  }

  submit(): void {
    if (!this.isValid(this.storeInList)) {
      this.msg.warning('请完善表单内容');
      return;
    }
    this.wmsService
      .postApiWarehouseIn({
        fields: this.storeInList
      })
      .subscribe(() => {
        this.msg.success('入库成功');
        this.drawerRef.close(true);
      });
  }
}
