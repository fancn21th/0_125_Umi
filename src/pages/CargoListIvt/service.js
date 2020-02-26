import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

//测试用默认盘点编号
// const defaultNo = '30000214-002';

async function queryCargoListIvt2({ current, pageSize, inventoryno }) {
  if (inventoryno) {
    const data = await request('/api/sinoapi/getcargolistivt', {
      params: {
        pageindex: current - 1,
        pageSize,
        inventoryno,
      },
    });
    return ApiTransformToData(data);
  }
  return Promise.resolve({
    total: 0,
    success: true,
    data: [],
  });
}

export async function queryIvtList({ pageindex, pagesize }) {
  return request('/api/sinoapi/getivtlist', {
    params: {
      pageindex,
      pagesize,
    },
  });
}
export const queryCargoListIvt = genAsyncSearch(queryCargoListIvt2);
