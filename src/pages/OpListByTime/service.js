import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-op';

export async function queryCargos({ current, pageSize, sorter, date: { begin, end } }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      begin,
      end,
    },
  });
  return ApiTransformToData(data);
}
