import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeHtml, SafeUrl } from '@angular/platform-browser';

export type ExceptionType = 403 | 404 | 500;

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'exception',
  exportAs: 'exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.less'],
  host: { '[class.exception]': 'true' },
  preserveWhitespaces: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ExceptionComponent {
  exceptionDesc = {
    403: '抱歉，你无权访问该页面',
    404: '抱歉，你访问的页面不存在',
    500: '抱歉，服务器出错了',
    backToHome: '返回首页'
  };
  _type: ExceptionType;
  _img: SafeUrl = '';
  _title: SafeHtml = '';
  _desc: SafeHtml = '';

  @Input()
  set type(value: ExceptionType) {
    const item = {
      403: {
        img: '../../../../../assets/images/exceptions/exception-403.svg',
        title: '403'
      },
      404: {
        img: '../../../../../assets/images/exceptions/exception-404.svg',
        title: '404'
      },
      500: {
        img: '../../../../../assets/images/exceptions/exception-500.svg',
        title: '500'
      }
    }[value];

    if (!item) return;

    this.fixImg(item.img);
    this._type = value;
    this._title = item.title;
    this._desc = '';
  }

  private fixImg(src: string): void {
    this._img = this.dom.bypassSecurityTrustStyle(`url('${src}')`);
  }

  @Input()
  set img(value: string) {
    this.fixImg(value);
  }

  @Input()
  set title(value: string) {
    this._title = this.dom.bypassSecurityTrustHtml(value);
  }

  @Input()
  set desc(value: string) {
    this._desc = this.dom.bypassSecurityTrustHtml(value);
  }

  constructor(private dom: DomSanitizer) { }
}
