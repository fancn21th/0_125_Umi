import request from '@/utils/request';
import { ApiTransformToData } from '../../../utils/api-to-data-report-cargobroken';

export async function queryCargos({ startTime, endTime, mode = 'day' }) {
  const data = await request('/api/report/cargo/status', {
    params: {
      startTime,
      endTime,
      mode,
    },
  });
  return ApiTransformToData(data);
}

export async function sendmail({
  startTime,
  endTime,
  type = 'CARGO_BROKEN_REPORT',
  keywords = '',
}) {
  return request('http://10.3.69.26:9097/api/report/emailSetting/selfSend', {
    params: {
      type,
      startTime,
      endTime,
      keywords,
    },
  });
}
