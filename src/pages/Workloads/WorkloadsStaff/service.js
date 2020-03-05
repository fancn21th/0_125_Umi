import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';
import { dataTransform } from './utils/dataTransform';

async function queryCargos2({ current, pageSize, sorter, mode, startTime, endTime }) {
  const data = await request('/api/sinoapi/exportworkloadstaff', {
    params: {
      pageindex: 0,
      pagesize: 1000,
      begin: startTime,
      end: endTime,
      mode,
    },
  });
  return dataTransform(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
