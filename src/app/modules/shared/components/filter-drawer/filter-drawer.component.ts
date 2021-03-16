import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'app-filter-drawer',
  templateUrl: './filter-drawer.component.html',
  styleUrls: ['./filter-drawer.component.less']
})
export class FilterDrawerComponent {
  @Input()
  isOpen = false;
  @Input()
  filterClassName: string;
  @Input()
  filterTitle: string | TemplateRef<{}>;
  @Input()
  filterRight: TemplateRef<{}>;
  @Input()
  filterContent: string | TemplateRef<{}>;

  isNonEmptyString(value: {}): boolean {
    return typeof value === 'string' && value !== '';
  }

  isTemplateRef(value: {}): boolean {
    return value instanceof TemplateRef;
  }
}
