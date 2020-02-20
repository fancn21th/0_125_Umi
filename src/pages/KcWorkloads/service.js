import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';
import { WorkloadsDataTranlate } from '../../utils/api-to-data-workloads';

export async function queryCargos({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return ApiTransformToData(data);
}

export async function getWorkloads({ current, pageSize, sorter, mode }) {
  const data = await request('/api/sinoapi/exportworkloadstaff', {
    params: {
      begin: sorter[0],
      end: sorter[1],
      mode,
      // pageindex: current,
      // pageSize,
    },
  });
  return WorkloadsDataTranlate(data);
}
