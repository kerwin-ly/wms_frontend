
import { DialogDirective } from '@bases';
import { Component, ChangeDetectionStrategy, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IDoc } from '@routes/list/models';

@Component({
  selector: 'list-edit-doc-dialog',
  templateUrl: './edit-doc-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EditDocDialogComponent extends DialogDirective {
  loading = false;
  form: FormGroup;

  @Input() doc: IDoc;

  constructor(
    private fb: FormBuilder
  ) {
    super();
    this.form = this.fb.group({
      name: [null, [Validators.required]],
      desc: [null, [Validators.required]]
    });
  }

  onAfterOpen() {
    if (this.doc) {
      this.form.patchValue(this.doc);
    }
  }

  onAfterClose() {
    this.form.reset();
    this.loading = false;
  }

  onConfirm() {
    // tslint:disable-next-line: forin
    for (const i in this.form.controls) {
      this.form.controls[i].markAsDirty();
      this.form.controls[i].updateValueAndValidity();
    }
    if (this.form.invalid) return;
    this.onOk();
  }
}
