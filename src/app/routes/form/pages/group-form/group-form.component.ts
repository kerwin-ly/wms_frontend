
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'form-group-form-page',
  templateUrl: './group-form.component.html'
})
export class GroupFormPageComponent {
  form: FormGroup;
  selectOptions = [
    {
      label: '系统默认',
      value: 'default'
    },
    {
      label: '自定义',
      value: 'custom'
    }
  ];
  radioOptions = this.selectOptions;
  checkboxOptions = this.selectOptions;
  cols = [
    {
      key: 'name',
      name: '字段名称',
      validators: [Validators.required]
    },
    {
      key: 'relation',
      name: '中文含义',
      validators: [Validators.required]
    },
    {
      key: 'content',
      name: '字段权重',
      validators: [Validators.required]
    }
  ];
  rows = [
    {
      name: 'title',
      relation: '标题',
      content: '1'
    }
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private router: Router
  ) {
    this.form = this.fb.group({
      input: [null, [Validators.required]],
      select: ['default', [Validators.required]],
      radio: ['default', [Validators.required]],
      checkbox: [this.checkboxOptions],
      editable: [this.rows]
    });
  }


  onSubmit() {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    console.warn('onSubmit', this.form.value);
  }

  onCancel() {
    if (this.form.dirty) {
      this.modalService.confirm({
        nzTitle: '是否放弃当前编辑内容?',
        nzOkType: 'danger',
        nzContent: '您输入的内容还未保存，现在离开将会丢弃已输入内容且无法撤销。',
        nzOnOk: () => {
          this.router.navigateByUrl('/');
        }
      });
    } else {
      this.router.navigateByUrl('/');
    }
  }
}
