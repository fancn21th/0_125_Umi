import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

export async function queryCargos({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : ''
    },
  });
  return ApiTransformToData(data);
}
