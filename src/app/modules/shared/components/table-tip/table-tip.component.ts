import { Component, Input, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';

@Component({
  selector: 'app-table-tip',
  templateUrl: './table-tip.component.html',
  styleUrls: ['./table-tip.component.less']
})
export class TableTipComponent implements AfterViewInit, OnDestroy {
  @Input()
  style: { [key: string]: string };
  @Input()
  text: string;
  @Input()
  width = 'auto';
  visible = true;

  _text = '';
  timer = null;
  CLASS_NAME = 'ellipsis-active-q';

  constructor(private element: ElementRef) {}

  ngAfterViewInit() {
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      if (this.width === 'auto') {
        const div = document.getElementsByClassName(`.${this.CLASS_NAME}`)[0];
        this.width = window.getComputedStyle(div).getPropertyValue('width');
      }
      this._text = this.text;
    });
  }

  getWidth(): string {
    if (typeof this.width === 'number') {
      return this.width + 'px';
    }
    return 'auto';
  }

  ngOnDestroy(): void {
    this._text = '';
    this.width = 'auto';
  }
}
