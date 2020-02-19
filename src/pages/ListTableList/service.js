import request from '@/utils/request';
import { DatatransformToCargos } from './data-formator';

export async function queryRule({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('http://localhost:5000/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : ''
    },
  });
  const list = DatatransformToCargos(data);
  return list;
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
