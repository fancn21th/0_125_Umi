import request from '@/utils/request';
import { dataTransform } from './utils/dataTransform';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, InOrderNo }) {
  const data = await request('/api/sinoapi/cargobrokenbyinorder', {
    params: {
      inorder: InOrderNo || '',
    },
  });
  return dataTransform(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
