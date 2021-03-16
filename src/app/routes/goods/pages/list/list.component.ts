import { Component, OnInit } from '@angular/core';
import { GoodsDetailComponent } from '@routes/goods/components/goods-detail/goods-detail.component';
import { IGoods } from '@routes/goods/models';
import { TableUtils } from '@utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GoodsService } from 'src/app/api/services';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less']
})
export class ListComponent implements OnInit {
  query = {
    word: ''
  };
  showFilter = false;
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  goodsList: IGoods[] = [];

  constructor(
    private goodsService: GoodsService,
    private modalService: NzModalService,
    private msg: NzMessageService,
    private tableUtils: TableUtils
  ) {}

  ngOnInit(): void {
    this.getList();
  }

  getList(isReset = false): void {
    if (isReset) {
      this.page.pageIndex = 1;
    }
    this.goodsService
      .getApiGoodsList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word
      })
      .subscribe((res) => {
        this.goodsList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  update(goods: IGoods): void {
    const modalRef = this.modalService.create({
      nzTitle: '编辑类目',
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
      nzTitle: '新增类目',
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
        name: data.name
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
          name: data.name
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
    this.goodsService.deleteApiGoods(id.toString()).subscribe(() => {
      this.msg.success('删除成功');
      this.page.pageIndex = this.tableUtils.fixPageIndex(this.goodsList, this.page.pageIndex);
      this.getList();
    });
  }

  clear(): void {
    this.query = {
      word: ''
    };
  }
}
