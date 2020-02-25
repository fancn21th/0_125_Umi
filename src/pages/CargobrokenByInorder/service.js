import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargobroken';

export async function queryCargos({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/cargobrokenbyinorder', {
    params: {
      inorder: InOrderNo ? InOrderNo : '',
    },
  });
  return ApiTransformToData(data);
}
