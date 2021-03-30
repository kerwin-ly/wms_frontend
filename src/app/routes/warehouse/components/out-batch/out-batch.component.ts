import { Component, Input, OnInit } from '@angular/core';
import { IStoreInItem, IStoreOutBatchItem, MOperation } from '@routes/warehouse/models';
import { WarehouseService } from 'src/app/api/services';

@Component({
  selector: 'app-out-batch',
  templateUrl: './out-batch.component.html',
  styleUrls: ['./out-batch.component.less']
})
export class OutBatchComponent implements OnInit {
  @Input() goods_id: number;
  @Input() out_code: string;

  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  batchList: IStoreOutBatchItem[] = [];
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
      .getApiWarehouseOutBatch({
        goods_id: this.goods_id.toString(),
        out_code: this.out_code,
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString()
      })
      .subscribe((res) => {
        this.batchList = res.data.items as IStoreOutBatchItem[];
        this.page.total = res.data.total;
      });
  }
}
