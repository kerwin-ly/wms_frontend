
import { randomNumber } from './util';

export const ANALYSIS_MOCK_DATA = {
  'analysis/card': () => {
    return {
      total: 4,
      items: [
        {
          title: 'monitor.total_count',
          data: randomNumber(4000, 10000),
          raise: true,
          trend: 11
        },
        {
          title: 'monitor.total_visit',
          data: randomNumber(4000, 10000),
          raise: true,
          trend: 26
        },
        {
          title: 'monitor.total_payment',
          data: randomNumber(4000, 10000),
          raise: false,
          trend: 3
        },
        {
          title: 'monitor.total_turnover',
          data: randomNumber(4000, 10000),
          raise: true,
          trend: 33
        }
      ]
    };
  },
  'analysis/mark-trend': () => {
    return {
      series: [
        {
          name: '男性',
          data: [
            randomNumber(500, 2500),
            randomNumber(900, 2800),
            randomNumber(1100, 3100),
            randomNumber(1400, 3400),
            randomNumber(1700, 3700),
            randomNumber(2000, 4000),
            randomNumber(2300, 4300),
            randomNumber(2600, 4600),
            randomNumber(2900, 4900),
            randomNumber(3200, 5200)
          ]
        },
        {
          name: '女性',
          data: [
            randomNumber(500, 2500),
            randomNumber(900, 2800),
            randomNumber(1100, 3100),
            randomNumber(1400, 3400),
            randomNumber(1700, 3700),
            randomNumber(2000, 4000),
            randomNumber(2300, 4300),
            randomNumber(2600, 4600),
            randomNumber(2900, 4900),
            randomNumber(3200, 5200)
          ]
        },
        {
          name: '未知性别',
          data: [
            randomNumber(500, 2500),
            randomNumber(900, 2800),
            randomNumber(1100, 3100),
            randomNumber(1400, 3400),
            randomNumber(1700, 3700),
            randomNumber(2000, 4000),
            randomNumber(2300, 4300),
            randomNumber(2600, 4600),
            randomNumber(2900, 4900),
            randomNumber(3200, 5200)
          ]
        }
      ]
    };
  },
  'analysis/user-pie': () => {
    return {
      total: 5,
      items: [
        {
          value: randomNumber(10, 60),
          name: '电子产品'
        },
        {
          value: randomNumber(10, 60),
          name: '服装家居'
        },
        {
          value: randomNumber(10, 60),
          name: '日常用品'
        },
        {
          value: randomNumber(10, 60),
          name: '交通出行'
        },
        {
          value: randomNumber(10, 60),
          name: '其他类别'
        }
      ]
    };
  },
  'analysis/system-data': () => {
    return {
      series: [
        {
          data: (new Array(10)).fill(0).map(() => randomNumber(600, 5000))
        }
      ]
    };
  },
  'analysis/product-category': () => {
    return {
      series: [
        {
          name: 'Orange',
          data: (new Array(10)).fill(0).map(() => randomNumber(10, 50))
        },
        {
          name: 'Apple',
          data: (new Array(10)).fill(0).map(() => randomNumber(10, 50))
        }
      ]
    };
  },
  'analysis/product-compare': () => {
    return {
      series: [
        {
          name: '天猫',
          data: (new Array(8)).fill(0).map(() => randomNumber(10, 50))
        },
        {
          name: '淘宝',
          data: (new Array(8)).fill(0).map(() => randomNumber(10, 50))
        }
      ]
    };
  }
};
