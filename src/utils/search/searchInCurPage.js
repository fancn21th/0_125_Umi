// singleton for each page
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

const containInString = (keywords, str) => str.includes(keywords);
const containInArray = (keywords, array) =>
  array.filter(item =>
    Object.keys(item).some(
      // 只比较字符串类型
      key =>
        item[key] &&
        ((typeof item[key] === 'string' && containInString(keywords, item[key])) ||
          (Array.isArray(item[key]) && containInArray(keywords, item[key])).length > 0),
    ),
  );

const searchInLast = (keywords, data) => {
  const { data: innerData } = data;
  if (data) {
    return {
      ...data,
      data: containInArray(keywords, innerData),
    };
  }
  return null;
};

/*
关键字搜索的约定:
  1. 关键字 params 字段名字是 keywords
  2. 当进行关键字搜索时 该字段必须不为空
  3. 当进行其它字段搜索时 关键字字段被设置为空
*/
const isKeywordsSearch = params => params.keywords && params.keywords.trim().length > 0;

const searchByKeywords = params => {
  const { keywords } = params;
  if (isKeywordsSearch(params)) {
    return searchInLast(keywords.trim(), context.last.data);
  }
  return params;
};

const isNonKeywordsSearchReturned = data => data.current;

export const genAsyncSearch = asyncQueryFun => async params => {
  let data = searchByKeywords(params);
  if (isNonKeywordsSearchReturned(data)) {
    data = await asyncQueryFun(params);
    setLast(params, data);
  }
  return data;
};
