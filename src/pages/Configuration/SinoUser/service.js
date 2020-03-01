import request from '@/utils/request';
import { encode } from './utils/md5';

export async function addSinoUser(params) {
  const { pwd } = params;
  return request('/api/sinoapi/rigister', {
    method: 'POST',
    data: { ...params, pwd: encode(pwd) },
  });
}
