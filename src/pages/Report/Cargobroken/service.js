import request from '@/utils/request';
import { ApiTransformToData } from '../../../utils/api-to-data-report-cargobroken';

export async function queryCargos({
  current,
  pageSize,
  startTime,
  endTime,
  mode = 'day',
  devType = 1,
}) {
  const data = await request('/api/report/cargo/broken', {
    params: {
      startTime,
      endTime,
      mode,
      devType,
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
