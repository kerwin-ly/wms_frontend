export const OVERVIEW_MOCK_DATA = {
  'overview/live-data': () => {
    return {
      total: 4,
      items: [
        {
          source: 'monitor.forumn_feedback',
          percent: '11',
          count: 40
        },
        {
          source: 'monitor.app_feedback',
          percent: '45',
          count: 50
        },
        {
          source: 'monitor.medium_feedback',
          percent: '19',
          count: 60
        },
        {
          source: 'monitor.other_feedback',
          percent: '25',
          count: 70
        }
      ]
    };
  },
  'overview/user-browser': () => {
    return {
      types: ['Safari', '百度', 'QQ', '微信', 'IE', '其他', 'UC', 'Chrome'],
      series: [
        {
          data: [6.38, 9.64, 10.06, 10.87, 11.03, 12.07, 16.28, 23.67]
        }
      ]
    };
  },
  'overview/platform-revenue': () => {
    return {
      types: ['汽车之家', '芒果', '百度贴吧', '知乎', 'CSDN', '爱奇艺', '优酷'],
      series: [
        {
          name: '会员收入',
          data: [80, 75, 60, 55, 43, 40, 35]
        },
        {
          name: '广告收入',
          data: [10, 20, 15, 15, 17, 20, 45]
        },
        {
          name: '其他收入',
          data: [10, 5, 25, 30, 40, 40, 20]
        }
      ]
    };
  },
  'overview/user-gender': () => {
    return {
      total: 3,
      items: [
        {
          name: '男性',
          value: 600
        },
        {
          name: '女性',
          value: 800
        },
        {
          name: '未知性别',
          value: 900
        }
      ]
    };
  },

  'overview/sales-rank': () => {
    return {
      series: [
        {
          name: 'Apple',
          data: 70
        },
        {
          name: 'HuaWei',
          data: 80
        }
      ]
    };
  }
};
