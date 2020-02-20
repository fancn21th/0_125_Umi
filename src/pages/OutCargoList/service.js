import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

export async function queryCargos({ current, pageSize, sorter, InOrderNo, OutOrderNo }) {
  const data = await request('/api/sinoapi/getoutcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : (OutOrderNo ? OutOrderNo : '')
    },
  });
  return ApiTransformToData(data);
}
