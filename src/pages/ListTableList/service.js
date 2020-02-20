import request from '@/utils/request';
import { DatatransformToCargos } from './data-formator';

export async function queryCargos({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('http://localhost:5000/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo ? InOrderNo : ''
    },
  });
  const list = DatatransformToCargos(data);
  return list;
}