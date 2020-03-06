import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';

export async function queryCargos({ startTime, endTime, mode = 'day' }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      begin: startTime,
      end: endTime,
      pageindex: 0,
      pagesize: 10000,
    },
  });
  return dataTransform(data);
}

export async function sendmail({
  startTime,
  endTime,
  type = 'CARGO_STATUS_REPORT',
  keywords = '',
}) {
  return request('/api/report/emailSetting/selfSend', {
    params: {
      type,
      startTime,
      endTime,
      keywords,
    },
  });
}
