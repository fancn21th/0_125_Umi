import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-op';

export async function queryCargos({ current, pageSize, sorter, OrderNo }) {
  const data = await request('/api/sinoapi/getoplist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: OrderNo || '',
    },
  });
  return ApiTransformToData(data);
}
