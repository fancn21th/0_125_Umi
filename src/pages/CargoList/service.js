import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';

const context = {
  last: {
    params: null,
    data: null,
  },
};

const searchInLast = (keywords, data) => {
  const { data: innerData } = data;
  if (data) {
    return {
      ...data,
      data: innerData.filter(item =>
        Object.keys(item).some(
          key => item[key] && typeof item[key] === 'string' && item[key].includes(keywords),
        ),
      ),
    };
  }
};
// 关键字搜索约定搜索内容不为空
const isKeywordsSearch = params => params.keywords && params.keywords.trim().length > 0;
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
    return searchInLast(keywords.trim(), context.last.data);
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
