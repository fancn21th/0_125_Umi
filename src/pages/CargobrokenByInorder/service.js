import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargobroken';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, InOrderNo }) {
  const data = await request('/api/sinoapi/cargobrokenbyinorder', {
    params: {
      inorder: InOrderNo ? InOrderNo : '',
    },
  });
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
