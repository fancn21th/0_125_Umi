import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-op';
import { ApiTransformToData as ApiTransformToLogData } from '../../utils/api-to-data-loglist';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryOpList2({ current, pageSize, orderno = '' }) {
  const data = await request('/api/sinoapi/getoplist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno,
    },
  });
  return ApiTransformToData(data);
}
export const queryOpList = genAsyncSearch(queryOpList2);

export async function queryUploadResultByInorder(inorder) {
  const data = await request('/api/sinoapi/getuploadresultbyinorder', {
    params: {
      inorder,
    },
  });
  return ApiTransformToLogData(data);
}

export async function queryUploadResult(opsn) {
  const data = await request('/api/sinoapi/getuploadresult', {
    params: {
      opsn,
    },
  });
  return ApiTransformToLogData(data);
}

export async function updateStatus(opsn, status) {
  return request('/api/sinoapi/updatesyncstatus', {
    params: {
      opsn,
      status,
    },
  });
}
