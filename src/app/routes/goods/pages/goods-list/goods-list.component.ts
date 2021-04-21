import { Component, OnInit } from '@angular/core';
import { GoodsDetailComponent } from '@routes/goods/components/goods-detail/goods-detail.component';
import { IGoods, IGoodsType } from '@routes/goods/models';
import { TableUtils } from '@utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GoodsService } from 'src/app/api/services';

@Component({
  selector: 'app-goods-list',
  templateUrl: './goods-list.component.html',
  styleUrls: ['./goods-list.component.less']
})
export class ListComponent implements OnInit {
  query = {
    word: '',
    type_id: null
  };
  showFilter = false;
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  goodsList: IGoods[] = [];
  typeList: IGoodsType[] = [];

  constructor(
    private goodsService: GoodsService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private tableUtils: TableUtils
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

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.goodsService
      .getApiGoodsList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word,
        type_id: this.query.type_id
      })
      .subscribe((res) => {
        this.goodsList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  update(goods: IGoods): void {
    const modalRef = this.modalService.create({
      nzTitle: '编辑商品',
      nzContent: GoodsDetailComponent,
      nzFooter: null,
      nzComponentParams: {
        goods,
        modalSuccess: (data: IGoods) => {
          this.updateGoods(data, modalRef);
        },
        modalCancel: () => {
          modalRef.close();
        }
      }
    });
  }

  add(): void {
    const modalRef = this.modalService.create({
      nzTitle: '新增商品',
      nzContent: GoodsDetailComponent,
      nzFooter: null,
      nzComponentParams: {
        modalSuccess: (data: IGoods) => {
          this.addGoods(data, modalRef);
        },
        modalCancel: () => {
          modalRef.close();
        }
      }
    });
  }

  addGoods(data: IGoods, ref: NzModalRef): void {
    this.goodsService
      .postApiGoods({
        name: data.name,
        type_id: data.type_id
      })
      .subscribe(() => {
        this.msg.success('新增成功');
        ref.close();
        this.getList(true);
      });
  }

  updateGoods(data: IGoods, ref: NzModalRef) {
    this.goodsService
      .putApiGoodsId({
        id: data.id.toString(),
        params: {
          name: data.name,
          type_id: data.type_id
        }
      })
      .subscribe(() => {
        this.msg.success('更新成功');
        ref.close();
        this.getList();
      });
  }

  delete(id: number): void {
    this.modalService.confirm({
      nzTitle: '确认删除该项？',
      nzOkText: '确定',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteGoods(id),
      nzCancelText: '取消'
    });
  }

  deleteGoods(id: number): void {
    this.goodsService.deleteApiGoodsId(id.toString()).subscribe(() => {
      this.msg.success('删除成功');
      this.page.pageIndex = this.tableUtils.fixPageIndex(this.goodsList, this.page.pageIndex);
      this.getList();
    });
  }

  clear(): void {
    this.query = {
      word: '',
      type_id: null
    };
  }
}
