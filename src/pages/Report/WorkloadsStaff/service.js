import request from '@/utils/request';
import { genAsyncSearch } from '../../../utils/search/searchInCurPage';
import { ApiTransformToData } from '../../../utils/api-to-data-staffwork';

const typeMap = {
  day: 'DAY_REPORT',
  month: 'MONTH_REPORT',
  year: 'YEAR_REPORT',
};

async function queryCargos2({ current, pageSize, sorter, mode, startTime, endTime }) {
  const data = await request('/api/report/workloads', {
    params: {
      mode,
      startTime,
      endTime,
    },
  });
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);

export async function sendmail({ mode, startTime, endTime, keywords = '' }) {
  return request('http://10.3.69.26:9097/api/report/emailSetting/selfSend?', {
    params: {
      type: typeMap[mode],
      startTime,
      endTime,
      keywords,
    },
  });
}
