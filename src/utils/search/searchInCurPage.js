const context = {
  // last search result
  last: {
    params: null,
    data: null,
  },
};

const setLast = (params, data) => {
  context.last = {
    params,
    data,
  };
};

const searchInLast = (keywords, data) => {
  const { data: innerData } = data;
  if (data) {
    return {
      ...data,
      data: innerData.filter(item =>
        Object.keys(item).some(
          // 只比较字符串类型
          key => item[key] && typeof item[key] === 'string' && item[key].includes(keywords),
        ),
      ),
    };
  }
  return null;
};

// 关键字搜索约定搜索内容不为空
const isKeywordsSearch = params => params.keywords && params.keywords.trim().length > 0;

// composed function
const searchByKeywords = params => {
  const { keywords } = params;
  // 通过关键字搜索
  if (isKeywordsSearch(params)) {
    return searchInLast(keywords.trim(), context.last.data);
  }
  return params;
};

export const genAsyncSearch = asyncQueryFun => async params => {
  let data = searchByKeywords(params);
  // 特征检查
  if (data.current) {
    data = await asyncQueryFun(params);
    setLast(params, data);
  }
  return data;
};
