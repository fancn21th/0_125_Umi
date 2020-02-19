import request from '@/utils/request';

const baseUrl = 'http://localhost:4000';

export async function queryRule(params) {
  console.log(params);
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
  console.log(sorter);
  return request(`${baseUrl}/report/workloads`, {
    ...sorter,
    pageNum: current,
    pageSize,
    mode: 'day',
  });
}
