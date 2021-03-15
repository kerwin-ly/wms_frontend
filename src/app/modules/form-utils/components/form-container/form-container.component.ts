import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'form-container',
  template: `
    <div class='form-container'>
      <ng-content select="main"></ng-content>
      <ng-content select="footer"></ng-content>
    </div>
  `,
  styleUrls: ['./form-container.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormContainerComponent{


}
