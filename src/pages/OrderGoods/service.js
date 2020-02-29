import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-good';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, InOrderNo }) {
  const cargos = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize: pageSize / 2,
      orderno: InOrderNo,
    },
  });
  const outcargos = await request('/api/sinoapi/getoutcargolist', {
    params: {
      pageindex: current - 1,
      pageSize: pageSize / 2,
      orderno: InOrderNo,
    },
  });
  return ApiTransformToData(cargos, outcargos);
}
export const queryCargos = genAsyncSearch(queryCargos2);
