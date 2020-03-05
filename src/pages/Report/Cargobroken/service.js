import request from '@/utils/request';
import moment from 'moment';
import { dataTransform } from './utils/dataTransform';

export async function queryCargos({
  current,
  pageSize,
  startTime,
  endTime,
  mode = 'day',
  devType = 1,
}) {
  const data = await request('/api/sinoapi/cargobroken', {
    params: {
      pageindex: 0,
      pagesize: 1000,
      begin: moment(startTime).format('YYYY-MM-DD'),
      end: moment(endTime).format('YYYY-MM-DD'),
    },
  });
  return dataTransform(data);
}

export async function sendmail({
  startTime,
  endTime,
  type = 'CARGO_BROKEN_REPORT',
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
