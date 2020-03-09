import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, begin, end }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      pageindex: 0,
      pageSize: 1000,
      begin,
      end,
    },
  });
  return dataTransform(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
