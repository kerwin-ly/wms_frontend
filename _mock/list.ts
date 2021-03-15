import { IMock } from '@bixi/mock';

const TASKS = new Array(100).fill(0).map((val, i) => {
  const num = i + 1;
  const progress = [1, 3, 10].includes(num) ? 1 : ((num * 10) % 100) / 100;
  return {
    id: num,
    name: `任务-${num}`,
    app: `应用-${num}`,
    app_link: `http://bixi.datagrand.com?doc=${num}`,
    robot: `机器人-${num}`,
    created_at: (new Date()).getTime() - (i * 10000000),
    created_by: `用户-${num}`,
    progress,
    status: progress === 0 ? 0 : (progress === 1 ? 1 : 2)
  };
});

const DOCS = new Array(100).fill(0).map((val, i) => {
  const num = i + 1;
  return {
    id: num,
    name: `文档-${num}.docx`,
    desc: `本合同项下款利率，在中国人民银行公布的人民币贷款基准利率9.75%的基础上 （上/下）浮86.2％，执行年利率为18％-${num}`,
    created_at: (new Date()).getTime() - (i * 10000000)
  };
});

export const LIST = {
  'api/docs': {
    get: {
      value(params) {
        const pageSize = parseInt(params._httpReq?.params.get('pageSize'), 10);
        const page = parseInt(params._httpReq?.params.get('page'), 10);
        const order = params._httpReq?.params.get('created_at') || 'ascend';
        const start = (page - 1) * pageSize;
        return {
          total: 100,
          items: (DOCS.sort((a, b) => {
            return order === 'ascend' ? b.created_at - a.created_at : a.created_at - b.created_at;
          })).slice(start, start + pageSize)
        };
      }
    }
  },
  'api/tasks': (params) => {
    const pageSize = parseInt(params._httpReq?.params.get('pageSize'), 10);
    const page = parseInt(params._httpReq?.params.get('page'), 10);
    const order = params._httpReq?.params.get('created_at') || 'ascend';
    const start = (page - 1) * pageSize;
    return {
      total: 100,
      items: (TASKS.sort((a, b) => {
        return order === 'ascend' ? b.created_at - a.created_at : a.created_at - b.created_at;
      })).slice(start, start + pageSize)
    };
  }
};
