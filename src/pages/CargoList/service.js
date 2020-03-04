/*
 * @Author: your name
 * @Date: 2020-02-26 15:09:31
 * @LastEditTime: 2020-03-04 10:31:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \SinotransUIOptimization\0_125_Umi\src\pages\CargoList\service.js
 */
import request from '@/utils/request';
import { ApiTransformToData } from '../../utils/api-to-data-cargo';
import { genAsyncSearch } from '../../utils/search/searchInCurPage';

async function queryCargos2({ current, pageSize, InOrderNo }) {
  const data = await request('/api/sinoapi/getcargolist', {
    params: {
      pageindex: current - 1,
      pageSize,
      orderno: InOrderNo || '',
    },
  });
  return ApiTransformToData(data);
}

export const queryCargos = genAsyncSearch(queryCargos2);
