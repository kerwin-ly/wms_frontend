import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'form-group-title',
  template: `
    <div class='form-group-title'>
      <ng-content></ng-content>
    </div>
  `,
  styleUrls: ['./form-group-title.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormGroupTitleComponent{


}
