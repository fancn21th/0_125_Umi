import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';
import { dataTransform } from './utils/dataTransform';

async function queryCargos2({ current, pageSize, mode, startTime, endTime, devType = 1 }) {
  const data = await request('/api/sinoapi/exportworkloaddev', {
    params: {
      begin: startTime,
      end: endTime,
      mode,
      devtype: devType,
      pageindex: 0,
      pagesize: 1000,
    },
  });
  return dataTransform(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);
