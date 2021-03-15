import { NzConfig, NZ_CONFIG } from 'ng-zorro-antd/core/config';

const zorroConfig: NzConfig = {
};

export const ZORRO_CONFIGS = [
  {
    provide: NZ_CONFIG,
    useValue: zorroConfig
  }
];
