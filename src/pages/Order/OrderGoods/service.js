import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, orderno }) {
  const cargos = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: 0,
      pageSize: 1000,
      orderno,
    },
  });
  const outcargos = await request('/api/sinoapi/getoutcargolist', {
    params: {
      pageindex: 0,
      pageSize: 1000,
      orderno,
    },
  });
  return dataTransform(cargos, outcargos);
}
export const queryCargos = genAsyncSearch(queryCargos2);
