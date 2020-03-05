import request from '@/utils/request';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';
import { dataTransform } from './utils/dataTransform';

const typeMap = {
  day: 'DEV_WORKLOAD_DAY_REPORT',
  month: 'DEV_WORKLOAD_MONTH_REPORT',
  year: 'DEV_WORKLOAD_YEAR_REPORT',
};

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

export async function sendmail({ mode, startTime, endTime, keywords = '' }) {
  return request('/api/report/emailSetting/selfSend', {
    params: {
      type: typeMap[mode],
      startTime,
      endTime,
      keywords,
    },
  });
}
