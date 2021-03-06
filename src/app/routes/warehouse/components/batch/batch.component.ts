import { Component, Input, OnInit } from '@angular/core';
import { IStoreInItem, MOperation } from '@routes/warehouse/models';
import { WarehouseService } from 'src/app/api/services';

@Component({
  selector: 'app-batch',
  templateUrl: './batch.component.html',
  styleUrls: ['./batch.component.less']
})
export class BatchComponent implements OnInit {
  @Input() goodsId: number;

  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  batchList: IStoreInItem[] = [];
  operationMap = MOperation;

  constructor(private wmsService: WarehouseService) {}

  ngOnInit(): void {
    this.getBatchList();
  }

  getBatchList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.wmsService
      .getApiWarehouseBatch({
        goods_id: this.goodsId.toString(),
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString()
      })
      .subscribe((res) => {
        this.batchList = res.data.items as IStoreInItem[];
        this.page.total = res.data.total;
      });
  }
}
