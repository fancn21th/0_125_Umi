import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

export async function queryCargoListIvt({ current, pageSize, sorter, inventoryno }) {
  const data = await request('/api/sinoapi/getcargolistivt', {
    params: {
      pageindex: current - 1,
      pageSize,
      inventoryno,
    },
  });
  return ApiTransformToData(data);
}

export async function queryIvtList({ pageindex, pagesize }) {
  return await request('/api/sinoapi/getivtlist', {
    params: {
      pageindex,
      pagesize,
    },
  });
}
