import request from '@/utils/request';
import { ApiTransformToData } from '../../../../utils/api-to-data-staffwork';

export async function queryCargos({ current, pageSize }) {
  const data = await request('/api/report/recipients', {
    params: {
      pageNum: current,
      pageSize,
    },
  });
  return ApiTransformToData(data);
}
