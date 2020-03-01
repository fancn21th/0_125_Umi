import request from '@/utils/request';

export async function addSinoUser(params) {
  return request('/api/sinoapi/rigister', {
    method: 'POST',
    data: { ...params },
  });
}
