import { Component, OnInit } from '@angular/core';
import { GoodsTypeDetailComponent } from '@routes/goods/components/goods-type-detail/goods-type-detail.component';
import { IGoodsType } from '@routes/goods/models';
import { TableUtils } from '@utils';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { GoodsService } from 'src/app/api/services';

@Component({
  selector: 'app-type-list',
  templateUrl: './type-list.component.html',
  styleUrls: ['./type-list.component.less']
})
export class TypeListComponent implements OnInit {
  query = {
    word: ''
  };
  showFilter = false;
  page = {
    pageIndex: 1,
    pageSize: 10,
    total: 1
  };
  typeList: IGoodsType[] = [];

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
      .getApiGoodsTypeList({
        page_index: this.page.pageIndex.toString(),
        page_size: this.page.pageSize.toString(),
        word: this.query.word
      })
      .subscribe((res) => {
        this.typeList = res.data.items;
        this.page.total = res.data.total;
      });
  }

  update(goods: IGoodsType): void {
    const modalRef = this.modalService.create({
      nzTitle: '编辑分类',
      nzContent: GoodsTypeDetailComponent,
      nzFooter: null,
      nzComponentParams: {
        goods,
        modalSuccess: (data: IGoodsType) => {
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
      nzTitle: '新增分类',
      nzContent: GoodsTypeDetailComponent,
      nzFooter: null,
      nzComponentParams: {
        modalSuccess: (data: IGoodsType) => {
          this.addGoods(data, modalRef);
        },
        modalCancel: () => {
          modalRef.close();
        }
      }
    });
  }

  addGoods(data: IGoodsType, ref: NzModalRef): void {
    this.goodsService
      .postApiGoodsType({
        name: data.name
      })
      .subscribe(() => {
        this.msg.success('新增成功');
        ref.close();
        this.getList(true);
      });
  }

  updateGoods(data: IGoodsType, ref: NzModalRef) {
    this.goodsService
      .putApiGoodsTypeId({
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
    this.goodsService.deleteApiGoodsTypeId(id.toString()).subscribe(() => {
      this.msg.success('删除成功');
      this.page.pageIndex = this.tableUtils.fixPageIndex(this.typeList, this.page.pageIndex);
      this.getList();
    });
  }

  clear(): void {
    this.query = {
      word: ''
    };
  }
}
