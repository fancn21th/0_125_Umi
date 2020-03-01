import request from '@/utils/request';
import { WorkloadsDataTranlate } from '../../utils/api-to-data-workloads';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function getMonthWorkloads2({ current, pageSize, sorter, type }) {
  const url = type ? '/api/sinoapi/exportworkloaddev' : '/api/sinoapi/exportworkloadstaff';
  let params;
  if (type) {
    params = {
      begin: sorter[0],
      end: sorter[1],
      devtype: type,
      mode: 'month',
      pageindex: current - 1,
      pageSize,
    };
  } else {
    params = {
      begin: sorter[0],
      end: sorter[1],
      mode: 'day',
      pageindex: current - 1,
      pageSize,
    };
  }
  const data = await request(url, {
    params,
  });
  return WorkloadsDataTranlate(data);
}
export const getMonthWorkloads = genAsyncSearch(getMonthWorkloads2);
