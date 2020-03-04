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
      pageindex: 0,
      pageSize: 1000,
    };
  } else {
    params = {
      begin: sorter[0],
      end: sorter[1],
      mode: 'day',
      pageindex: 0,
      pageSize: 1000,
    };
  }
  const data = await request(url, {
    params,
  });
  return WorkloadsDataTranlate(data);
}
export const getMonthWorkloads = genAsyncSearch(getMonthWorkloads2);
