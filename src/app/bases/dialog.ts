
import { Input, Output, EventEmitter, Directive } from '@angular/core';

@Directive()
export class DialogDirective {
  isShow = false;

  @Input()
  set visible(val: boolean) {
    this.isShow = val;
  }
  get visible() {
    return this.isShow;
  }
  @Output() cancel = new EventEmitter<boolean>();
  @Output() ok = new EventEmitter<boolean>();
  @Output() visibleChange = new EventEmitter<boolean>();

  onOk() {
    this.visibleChange.emit(false);
    this.ok.emit(true);
  }
  onCancel() {
    this.visibleChange.emit(false);
    this.cancel.emit(true);
  }
}
