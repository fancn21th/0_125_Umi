import request from '@/utils/request';
import { ApiTransformToData } from '../../../utils/api-to-data-report-cargostatus';

export async function queryCargos({ startTime, endTime, mode = 'day' }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      begin: startTime,
      end: endTime,
      pageindex: 0,
      pagesize: 1000,
    },
  });
  return ApiTransformToData(data);
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
