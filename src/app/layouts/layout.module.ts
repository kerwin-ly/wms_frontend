import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { LayoutDefaultComponent } from './default/default.component';
import { COMPONENTS } from './default/components';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BixiLayoutModule } from '@bixi/core/layout';
import { SpinComponent } from './spin/spin.component';
import { NzSpinModule } from 'ng-zorro-antd/spin';

const ZORRO_MODULES = [
  NzAvatarModule,
  NzButtonModule,
  NzPopoverModule,
  NzToolTipModule,
  NzIconModule,
  NzMenuModule,
  NzDropDownModule,
  NzSpinModule
];

@NgModule({
  imports: [CommonModule, RouterModule, FormsModule, TranslateModule, BixiLayoutModule, ...ZORRO_MODULES],
  declarations: [...COMPONENTS, LayoutDefaultComponent, SpinComponent],
  exports: [...COMPONENTS, LayoutDefaultComponent]
})
export class LayoutModule {}
