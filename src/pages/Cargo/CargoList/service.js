import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return dataTransform(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);
