import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'shared-page-container',
  template: `
    <div class='shared-page-container'>
      <div class="shared-page-container-inner">
        <ng-content></ng-content>
      </div>
    </div>
  `,
  styleUrls: ['./page-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PageContainerComponent {


}
