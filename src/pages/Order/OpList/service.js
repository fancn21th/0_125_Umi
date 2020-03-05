import request from '@/utils/request';
import { dataTransformOP } from './utils/dataTransformOp';
import { dataTransformLog } from './utils/dataTransformLog';
import { genAsyncSearch } from '@/utils/search/searchInCurPage';

let lastOrderNo = '';

async function queryOpList2({ current, pageSize, orderno = '' }) {
  let nextPageIndex = current - 1;
  // 如果基于orderno搜索并且当前不在第一页则重置到第一页
  if (lastOrderNo !== orderno) {
    nextPageIndex = 0;
  }
  const data = await request('/api/sinoapi/getoplist', {
    params: {
      pageindex: 0,
      pageSize: 1000,
      orderno,
    },
  });
  lastOrderNo = orderno;
  return dataTransformOP(data);
}
export const queryOpList = genAsyncSearch(queryOpList2);

export async function queryUploadResultByInorder(inorder) {
  const data = await request('/api/sinoapi/getuploadresultbyinorder', {
    params: {
      inorder,
    },
  });
  return dataTransformLog(data);
}

export async function queryUploadResult(opsn) {
  const data = await request('/api/sinoapi/getuploadresult', {
    params: {
      opsn,
    },
  });
  return dataTransformLog(data);
}

export async function updateStatus(opsn, status) {
  return request('/api/sinoapi/updatesyncstatus', {
    params: {
      opsn,
      status,
    },
  });
}
