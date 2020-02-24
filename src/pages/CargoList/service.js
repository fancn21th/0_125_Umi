import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

const context = { last: {} };

const searchIn = (keywords, data = []) => data;

// composed function
export const searchByKeywords = params => {
  const { isKeywords, keywords } = params;
  // 通过关键字搜索
  if (isKeywords) {
    return searchIn(keywords, context.last);
  }
  return params;
};

export async function queryCargos(params) {
  let data = searchByKeywords(params);
  if (data.current) {
    data = await queryCargos2(params);
    context.last = data;
  }
  return data;
}

export async function queryCargos2({ current, pageSize, sorter, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return ApiTransformToData(data);
}
