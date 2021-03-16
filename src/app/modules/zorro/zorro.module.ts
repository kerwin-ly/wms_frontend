import { NgModule } from '@angular/core';
import { BasicModule } from '@modules/basic/basic.module';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzMessageModule } from 'ng-zorro-antd/message';
import { NzSwitchModule } from 'ng-zorro-antd/switch';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzUploadModule } from 'ng-zorro-antd/upload';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzSkeletonModule } from 'ng-zorro-antd/skeleton';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

const ZORRO_MODULES = [
  NzInputModule,
  NzCheckboxModule,
  NzSwitchModule,
  NzFormModule,
  NzButtonModule,
  NzMessageModule,
  NzToolTipModule,
  NzModalModule,
  NzDividerModule,
  NzGridModule,
  NzTabsModule,
  NzSpaceModule,
  NzAvatarModule,
  NzSelectModule,
  NzRadioModule,
  NzDatePickerModule,
  NzInputNumberModule,
  NzUploadModule,
  NzPageHeaderModule,
  NzStepsModule,
  NzEmptyModule,
  NzCardModule,
  NzSkeletonModule,
  NzIconModule,
  NzTableModule,
  NzDrawerModule,
  NzModalModule,
  NzDividerModule
];

@NgModule({
  imports: [BasicModule, ...ZORRO_MODULES],
  exports: [BasicModule, ...ZORRO_MODULES]
})
export class ZorroModule {}
