import { Component, OnInit } from '@angular/core';
import { IGoods } from '@routes/goods/models';
import { cloneDeep, map, reduce } from 'lodash-es';
import { NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzMessageService } from 'ng-zorro-antd/message';
import { GoodsService, WarehouseService } from 'src/app/api/services';

const STORE_OUT_SCHEMA = {
  goods_id: null,
  out_num: null,
  total: 0
};

interface IStoreOut {
  goods_id: number;
  out_num: number;
  total?: number;
}

@Component({
  selector: 'app-store-out-detail',
  templateUrl: './store-out-detail.component.html',
  styleUrls: ['../store-in-detail/store-in-detail.component.less', './store-out-detail.component.less']
})
export class StoreOutDetailComponent implements OnInit {
  storeOutList: IStoreOut[] = [];
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  query = {
    word: ''
  };
  goodsList: IGoods[] = [];

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

  addRow(): void {
    const temp = cloneDeep(STORE_OUT_SCHEMA);
    this.storeOutList = [...this.storeOutList, temp];
  }

  selectGoods(id: number, item: IStoreOut): void {
    this.wmsService
      .getApiWarehouseBatch({
        goods_id: id.toString(),
        page_index: '1',
        page_size: '10000'
      })
      .subscribe((res) => {
        item.total = reduce(res.data.items, (sum, subItem) => (sum += subItem.exist_num), 0);
      });
  }

  close(): void {
    this.drawerRef.close();
  }

  isValid(list: IStoreOut[]): boolean {
    return list.every((item) => item.goods_id && item.out_num);
  }

  submit(): void {
    if (!this.isValid(this.storeOutList)) {
      this.msg.warning('请完善表单内容');
      return;
    }
    const list = map(this.storeOutList, (item) => ({ goods_id: item.goods_id, num: item.out_num }));
    this.wmsService
      .postApiWarehouseOut({
        out_list: list
      })
      .subscribe(() => {
        this.msg.success('出库成功');
        this.drawerRef.close(true);
      });
  }
}
