import { NgModule } from '@angular/core';
import { NET_PROVIDES } from '@cores/net';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { STARTUP_PROVIDES, SENTRY_PROVIDERS, GUARD_PROVIDES, I18N_MODULES, I18N_PROVIDES, MOCK_MODULES } from '@cores';
import { ZORRO_CONFIGS } from '@modules/zorro/zorro.config';
import { BasicModule } from '@modules/basic/basic.module';
import { BIXI_CONFIGS } from '@modules/bixi/bixi.config';
import { AppComponent } from './app.component';
import { RoutesModule } from './routes/routes.module';
import { LayoutModule } from './layouts/layout.module';
import { BixiProgressModule } from '@bixi/progress';
import { ZorroModule } from '@modules/zorro/zorro.module';
import { ApiModule } from './api/api.module';
@NgModule({
  declarations: [AppComponent],
  imports: [
    BasicModule,
    RoutesModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule, // app.component 会依赖 modal
    NzModalModule,
    ZorroModule, // 以下这两个特性模块有可能会拖出 zorro，为了保证main bundle 小一些，这里不要直接依赖 shared module
    LayoutModule,
    BixiProgressModule.forRoot({}),
    ...I18N_MODULES,
    ...MOCK_MODULES,
    ApiModule.forRoot({ rootUrl: '.' })
  ],
  providers: [
    ...NET_PROVIDES,
    ...I18N_PROVIDES,
    ...STARTUP_PROVIDES,
    ...SENTRY_PROVIDERS,
    ...GUARD_PROVIDES,
    ...ZORRO_CONFIGS,
    ...BIXI_CONFIGS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
