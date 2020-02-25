import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return ApiTransformToData(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);
