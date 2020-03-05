import request from '@/utils/request';
import { genAsyncSearch } from '../../../utils/search/searchInCurPage';
import { WorkloadsDataTranlate } from '../../../utils/api-to-data-workloads';

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
  return WorkloadsDataTranlate(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);
