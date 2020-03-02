import request from '@/utils/request';
import { genAsyncSearch } from '../../../utils/search/searchInCurPage';
import { ApiTransformToData } from '../../../utils/api-to-data-staffwork';

const typeMap = {
  day: 'DAY_REPORT',
  month: 'MONTH_REPORT',
  year: 'YEAR_REPORT',
};

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
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);

export async function sendmail({ mode, startTime, endTime, keywords = '' }) {
  return request('/api/report/emailSetting/selfSend?', {
    params: {
      type: typeMap[mode],
      startTime,
      endTime,
      keywords,
    },
  });
}
