import { BixiTableModule } from '@bixi/core/table';
import { BixiEditableTableModule } from '@bixi/core/editable-table';
import { BixiColorPickerModule } from '@bixi/core/color-picker';
import { BixiTagSelectModule } from '@bixi/core/tag-select';
import { BixiTimeModule } from '@bixi/core/time';
import { BixiFilterModule } from '@bixi/core/filter';
import { NgModule } from '@angular/core';
import { ZorroModule } from '@modules/zorro/zorro.module';

const BIXI_MODULES = [
  BixiTableModule,
  BixiEditableTableModule,
  BixiColorPickerModule,
  BixiTagSelectModule,
  BixiFilterModule,
  BixiTimeModule
];

@NgModule({
  imports: [
    ZorroModule,
    ...BIXI_MODULES
  ],
  exports: [
    ZorroModule,
    ...BIXI_MODULES
  ]
})
export class BixiModule { }
