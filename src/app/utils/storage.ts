import { IUser, ISettings, ISafeAny } from '@models';
import { LANG } from '@constants';
import { SiteTheme } from '@services';
import { IMenu } from '@bixi/core/layout';

function formatKey(key: string) {
  return `bixi_pro_${key}`.toUpperCase();
}

function getItem(key: string) {
  const str = localStorage.getItem(formatKey(key));
  try {
    return JSON.parse(str);
  } catch (e) {
    return null;
  }
}

function removeItem(key: string) {
  localStorage.removeItem(formatKey(key));
}

function setItem(key: string, data: ISafeAny) {
  localStorage.setItem(formatKey(key), JSON.stringify(data));
}

const $storage = {
  get lang(): string {
    const l = getItem('lang');
    return [LANG.en, LANG.zh].includes(l) ? l : LANG.zh;
  },
  set lang(data: string) {
    setItem('lang', data);
  },

  get theme(): SiteTheme {
    return getItem('theme') || 'default';
  },
  set theme(data: SiteTheme) {
    setItem('theme', data);
  },

  get settings(): ISettings {
    return getItem('settings');
  },
  set settings(data: ISettings) {
    setItem('settings', data);
  },

  get user(): IUser {
    return getItem('user') || { username: '' };
  },
  set user(data: IUser) {
    setItem('user', data);
  },

  get token() {
    return getItem('token') || '';
  },
  set token(data: string) {
    setItem('token', data);
  },

  get permissions() {
    return getItem('permissions') || [];
  },
  set permissions(data: string[]) {
    setItem('permissions', data);
  },

  get menus(): IMenu[] {
    return getItem('menus') || [];
  },
  set menus(data: IMenu[]) {
    setItem('menus', data);
  },

  get account(): string {
    return getItem('account') || '';
  },
  set account(data: string) {
    setItem('account', data);
  },

  get rememberAccount(): boolean {
    return getItem('rememberAccount') || false;
  },
  set rememberAccount(data: boolean) {
    setItem('rememberAccount', data);
  },
  clear() {
    removeItem('token');
    removeItem('user');
    removeItem('permissions');
  }
};
export {
  $storage
};
