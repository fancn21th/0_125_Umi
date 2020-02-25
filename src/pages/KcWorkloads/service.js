import request from '@/utils/request';
import { WorkloadsDataTranlate } from '../../utils/api-to-data-workloads';

export async function getWorkloads({ current, pageSize, sorter, type }) {
  const url = type ? '/api/sinoapi/exportworkloaddev' : '/api/sinoapi/exportworkloadstaff';
  let params;
  if (type) {
    params = {
      begin: sorter[0],
      end: sorter[1],
      devtype: type,
      mode: 'day',
      // pageindex: current,
      // pageSize,
    };
  } else {
    params = {
      begin: sorter[0],
      end: sorter[1],
      mode: 'day',
      // devType: type,
      // pageindex: current,
      // pageSize,
    };
  }
  const data = await request(url, {
    params,
  });
  return WorkloadsDataTranlate(data);
}
