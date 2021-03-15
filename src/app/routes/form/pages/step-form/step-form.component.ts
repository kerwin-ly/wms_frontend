
import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { forEach } from 'lodash-es';

@Component({
  selector: 'form-step-form-page',
  templateUrl: './step-form.component.html',
  styleUrls: ['./step-form.component.less']
})
export class StepFormPageComponent {
  current = 0;
  forms: {
    [prop: number]: FormGroup
  } = {};

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.forms[0] = this.fb.group({
      input1: [null, [Validators.required]],
      input2: [null, [Validators.required]],
      input3: [null, [Validators.required]]
    });
    this.forms[1] = this.fb.group({
      input4: [null, [Validators.required]]
    });
    this.forms[2] = this.fb.group({
      input5: [null, [Validators.required]]
    });
    this.forms[3] = this.fb.group({
      input6: [null, [Validators.required]]
    });
  }

  onSubmit() {
    console.warn('onSubmit');
  }

  onNext() {
    forEach(this.forms[this.current].controls, (val, key) => {
      val.markAsDirty();
      val.updateValueAndValidity();
    });
    if (this.forms[this.current].invalid) return;
    this.current += 1;
  }

  onPre() {
    this.current -= 1;
  }

  onCancel() {
    this.router.navigateByUrl('/');
  }
}
