import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoods, IGoodsType } from '@routes/goods/models';
import { isValid } from '@utils';
import { GoodsService } from 'src/app/api/services';

@Component({
  selector: 'app-goods-detail',
  templateUrl: './goods-detail.component.html',
  styleUrls: ['./goods-detail.component.less']
})
export class GoodsDetailComponent implements OnInit {
  @Input() goods: IGoods;
  @Input() modalSuccess: (data: IGoods) => void;
  @Input() modalCancel: () => void;

  validateForm: FormGroup;
  typeList: IGoodsType[] = [];

  constructor(private fb: FormBuilder, private goodsService: GoodsService) {}

  ngOnInit(): void {
    this.getTypeList();
    let name = '';
    let type_id = null;

    if (this.goods) {
      name = this.goods.name;
      type_id = this.goods.type_id;
    }
    this.validateForm = this.fb.group({
      name: [name, [Validators.required]],
      type_id: [type_id, [Validators.required]]
    });
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

  cancel(): void {
    this.modalCancel();
  }

  submit(): void {
    if (!isValid(this.validateForm)) {
      return;
    }
    const parmas = this.goods ? Object.assign(this.goods, this.validateForm.value) : this.validateForm.value;
    this.modalSuccess(parmas);
  }
}
