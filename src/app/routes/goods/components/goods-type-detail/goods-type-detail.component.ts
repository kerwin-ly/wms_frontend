import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGoodsType } from '@routes/goods/models';
import { isValid } from '@utils';
import { GoodsService } from 'src/app/api/services';

@Component({
  selector: 'app-goods-type-detail',
  templateUrl: './goods-type-detail.component.html',
  styleUrls: ['./goods-type-detail.component.less']
})
export class GoodsTypeDetailComponent implements OnInit {
  @Input() goods: IGoodsType;
  @Input() modalSuccess: (data: IGoodsType) => void;
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
