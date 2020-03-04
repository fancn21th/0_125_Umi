/*
 * @Author: your name
 * @Date: 2020-03-03 11:36:51
 * @LastEditTime: 2020-03-04 10:38:19
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SinotransUIOptimization\0_125_Umi\src\pages\OpListByTime\service.js
 */
import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-op';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, sorter, begin, end }) {
  const data = await request('/api/sinoapi/getoplistbytime', {
    params: {
      pageindex: 0,
      pageSize: 1000,
      begin,
      end,
    },
  });
  return ApiTransformToData(data);
}
export const queryCargos = genAsyncSearch(queryCargos2);
