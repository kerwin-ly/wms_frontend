
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ITag } from '@bixi/core/tag-select';
import { NzModalService } from 'ng-zorro-antd/modal';

@Component({
  selector: 'form-basic-form-page',
  templateUrl: './basic-form.component.html'
})
export class BasicFormPageComponent {
  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private modalService: NzModalService,
    private router: Router
  ) {
    this.form = this.fb.group({
      input: [null, [Validators.required]],
      select: ['Jack', [Validators.required]],
      radio: ['Jack', [Validators.required]],
      checkbox: [this.checkboxOptions],
      tags: [['1', '2'], Validators.required],
      color: ['#107CEE', Validators.required],
      switch: [true, Validators.required],
      dateRange: [null, Validators.required],
      timeRange: [null, Validators.required],
      number: [5, Validators.required],
      textarea: [null, Validators.required],
      editable: [this.rows]
    });
  }

  selectOptions = [
    {
      label: 'Jack',
      value: 'Jack'
    },
    {
      label: 'Lucy',
      value: 'Lucy'
    }, {
      label: 'Tom',
      value: 'Tom'
    }
  ];
  allTags: ITag[] = [{
    color: 'blue',
    value: '1',
    label: 'React'
  }, {
    color: 'cyan',
    value: '2',
    label: 'Vue'
  }, {
    color: 'orange',
    value: '3',
    label: 'Angular'
  }, {
    color: '#107CEE',
    value: '4',
    label: 'Express'
  }];

  radioOptions = this.selectOptions;
  checkboxOptions = this.selectOptions;
  cols = [
    {
      key: 'name',
      name: '审核点'
    },
    {
      key: 'relation',
      name: '关系'
    },
    {
      key: 'content',
      name: '风险内容'
    },
    {
      key: 'desc',
      name: '问题描述'
    }
  ];
  rows = [
    {
      name: '组合1',
      relation: '等于',
      content: '字段1',
      desc: 'A类型'
    },
    {
      name: '组合2',
      relation: '小于',
      content: '字段2',
      desc: 'B类型'
    },
    {
      name: '组合3',
      relation: '大于',
      content: '字段3',
      desc: 'C类型'
    }
  ];

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
