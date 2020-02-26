import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, InOrderNo, OutOrderNo }) {
  const data = await request('/api/sinoapi/getoutcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : OutOrderNo ? OutOrderNo : '',
    },
  });
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
