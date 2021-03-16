import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { COMPONENTS } from './components';
import { BixiModule } from '@modules/bixi/bixi.module';
import { ZorroModule } from '@modules/zorro/zorro.module';

const MODULES = [CommonModule, BixiModule, ZorroModule];

@NgModule({
  imports: [...MODULES],
  declarations: [...COMPONENTS],
  exports: [...MODULES, ...COMPONENTS]
})
export class SharedModule {}
