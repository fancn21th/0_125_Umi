import request from '@/utils/request';

export async function queryRule(params) {
  return request('/api/rule', {
    params,
  });
}
export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'delete' },
  });
}
export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'post' },
  });
}
export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: { ...params, method: 'update' },
  });
}

// 获取日工作量报表数据列表
export async function getWorkList({ current, pageSize, sorter }) {
  const data = await request('/api/report/workloads', {
    params: {
      mode: 'day',
      startTime: sorter[0],
      endTime: sorter[1],
      pageNum: current,
      pageSize,
    },
  });
  return { data, current, total: 10, success: true, pageSize };
}
