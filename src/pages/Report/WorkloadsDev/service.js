import request from '@/utils/request';
import { genAsyncSearch } from '../../../utils/search/searchInCurPage';
import { ApiTransformToData } from '../../../utils/api-to-data-devwork';

const typeMap = {
  day: 'DAY_REPORT',
  month: 'DEV_WORKLOAD_MONTH_REPORT',
  year: 'DEV_WORKLOAD_YEAR_REPORT',
};

async function queryCargos2({ current, pageSize, mode, startTime, endTime, devType = 1 }) {
  const data = await request('/api/report/workloads/devices', {
    params: {
      startTime,
      endTime,
      mode,
      devType,
    },
  });
  return ApiTransformToData(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);

export async function sendmail({ mode, startTime, endTime, keywords = '' }) {
  return request('http://10.3.69.26:9097/api/report/emailSetting/selfSend', {
    params: {
      type: typeMap[mode],
      startTime,
      endTime,
      keywords,
    },
  });
}
