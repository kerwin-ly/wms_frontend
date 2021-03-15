import { BIXI_TABLE_CONFIG } from '@bixi/core/table';
import { BIXI_AUTH_CONFIG, BixiAuthConfig } from '@bixi/auth';

const bixiAuthConfig: BixiAuthConfig = {
  store_key: 'bixi_pro_auth'.toUpperCase(),
  login_url: '/passport/login',
  ignores: [/\/token/, /assets\//],
  token_send_key: 'token', // 请求头token key值
  token_send_template: '${token}', // 请求头token value值
  token_send_place: 'header' // 键值对添加位置
};

const bixiTableConfig = {
  status: {}
};

export const BIXI_CONFIGS = [
  {
    provide: BIXI_TABLE_CONFIG,
    useValue: bixiTableConfig
  },
  {
    provide: BIXI_AUTH_CONFIG,
    useValue: bixiAuthConfig
  }
];
