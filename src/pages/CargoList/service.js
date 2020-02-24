import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

const context = {
  last: {
    params: {},
    data: {},
  },
};

const searchInLast = (keywords, data = []) => data;
const isKeywordsSearch = params => params.keywords && params.keywords.length > 0;
const setLast = (params, data) => {
  context.last = {
    params,
    data,
  };
};

// composed function
export const searchByKeywords = params => {
  const { keywords } = params;
  // 通过关键字搜索
  if (isKeywordsSearch(params)) {
    return searchInLast(keywords, context.last.data);
  }
  return params;
};

export async function queryCargos(params) {
  console.log('alex', params);
  let data = searchByKeywords(params);
  // 特征检查
  if (data.current) {
    data = await queryCargos2(params);
    setLast(params, data);
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
