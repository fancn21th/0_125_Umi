import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

export async function queryCargos({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return ApiTransformToData(data);
}

const fakeReq = (res, ms) => new Promise(resolve => setTimeout(() => resolve(res), ms));

export async function queryCargoNoList() {
  const data = await fakeReq([1, 2], 2000);
  return data;
}
