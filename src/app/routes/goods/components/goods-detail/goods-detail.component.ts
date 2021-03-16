import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoods } from '@routes/goods/models';
import { isValid } from '@utils';

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

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    let name = '';
    if (this.goods) {
      name = this.goods.name;
    }
    this.validateForm = this.fb.group({
      name: [name, [Validators.required]]
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
