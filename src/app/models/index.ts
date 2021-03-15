
export interface IUser {
  account: string;
  username: string;
}

export interface ISettings {
  title: string;
  favicon: string;
  avatar: string;
  login: {
    header: {
      logo: string;
    },
    main: {
      background: string;
      slogan: {
        title: string;
        items: string[]
      }
    }
    footer: {
      links: {
        text: string;
        link: string;
      }[];
      copyright: string;
    }
  };
  menu: {
    logoSmall: string;
    logoLarge: string;
  };
}

export interface IList<T> {
  total: number;
  items: T[];
}

// tslint:disable-next-line: no-any
export type ISafeAny = any;
