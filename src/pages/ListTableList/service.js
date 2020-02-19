import request from '@/utils/request';

export async function queryRule(params) {
  const data = await request('/api/rule', {
    params,
  });
  return {
    data,
    total: 103,
    success: true,
    pageSize: '10',
    current: 1,
  };
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
