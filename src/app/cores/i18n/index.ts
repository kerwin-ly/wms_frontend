
import { LOCALE_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { registerLocaleData } from '@angular/common';
import 'dayjs/locale/zh-cn';
import 'dayjs/locale/en';
import { NZ_I18N, zh_CN as NZ_ZH, en_US as NZ_EN } from 'ng-zorro-antd/i18n';
import { BIXI_I18N, zh_CN as BIXI_ZH, en_US as BIXI_EN } from '@bixi/core/i18n';
import { default as NG_ZH } from '@angular/common/locales/zh';
import { default as NG_EN } from '@angular/common/locales/en';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { $storage, dayjs } from '@utils';
import { LANG } from '@constants';

export const LOCALES = {
  zorro: {
    [LANG.zh]: NZ_ZH,
    [LANG.en]: NZ_EN
  },
  bixi: {
    [LANG.zh]: BIXI_ZH,
    [LANG.en]: BIXI_EN
  },
  angular: {
    [LANG.zh]: NG_ZH,
    [LANG.en]: NG_EN
  },
  dayjs: {
    [LANG.zh]: 'zh-cn',
    [LANG.en]: 'en'
  }
};

const lang = $storage.lang;

dayjs.locale(LOCALES.dayjs[lang]);

registerLocaleData(LOCALES.angular[LANG.zh], LANG.zh);
registerLocaleData(LOCALES.angular[LANG.en], LANG.en);

const LANG_PROVIDES = [
  { provide: LOCALE_ID, useValue: lang },
  { provide: NZ_I18N, useValue: LOCALES.zorro[lang] },
  { provide: BIXI_I18N, useValue: LOCALES.bixi[lang] }
];

function I18nHttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, `assets/i18n/`, '.json');
}

const I18N_MODULES = [
  TranslateModule.forRoot({
    defaultLanguage: LANG.zh,
    useDefaultLang: true,
    loader: {
      provide: TranslateLoader,
      useFactory: I18nHttpLoaderFactory,
      deps: [HttpClient]
    }
  })
];

const I18N_PROVIDES = [
  ...LANG_PROVIDES
];


export {
  I18N_PROVIDES,
  I18N_MODULES
};
