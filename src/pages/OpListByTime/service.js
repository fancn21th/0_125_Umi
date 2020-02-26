import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-op';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, begin, end }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      begin,
      end,
    },
  });
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
