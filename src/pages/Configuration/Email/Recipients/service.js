import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';

export async function queryCargos({ current, pageSize }) {
  const data = await request('/api/report/recipients', {
    params: {
      pageNum: current,
      pageSize,
    },
  });
  return dataTransform(data);
}

export async function remove({ id }) {
  return request(`/api/report/recipients/${id}`, {
    method: 'DELETE',
  });
}
export async function add({ name, email }) {
  return request('/api/report/recipients', {
    method: 'POST',
    data: { name, email },
  });
}
export async function update({ id, name, email }) {
  return request(`/api/report/recipients/${id}`, {
    method: 'PUT',
    data: { name, email },
  });
}
