import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, InOrderNo, OutOrderNo }) {
  const data = await request('/api/sinoapi/getoutcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : OutOrderNo ? OutOrderNo : '',
    },
  });
  return dataTransform(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
