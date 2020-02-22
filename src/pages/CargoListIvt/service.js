import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

const defaultNo = '30000214-002';

export async function queryCargoListIvt({ current, pageSize, sorter, inventoryno = defaultNo }) {
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
  return request('/api/sinoapi/getivtlist', {
    params: {
      pageindex,
      pagesize,
    },
  });
}
