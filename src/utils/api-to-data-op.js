/*
 * @Author: your name
 * @Date: 2020-02-27 09:14:36
 * @LastEditTime: 2020-03-04 10:36:15
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \SinotransUIOptimization\0_125_Umi\src\utils\api-to-data-op.js
 */
import uuid from './uuid';
import { timetrans, timetrans_sim } from './date-transform';

import islocal from './islocal-total';

export function ApiTransformToData(apidata) {
  if (islocal(apidata)) {
    const data = apidata.map(op => {
      return {
        ...op,
        OrderTimestamp: timetrans(op.OrderTimestamp),
        DeadlineTimestamp: timetrans_sim(op.DeadlineTimestamp),
        BeginTimestamp: timetrans_sim(op.BeginTimestamp),
        EndTimestamp: timetrans_sim(op.EndTimestamp),
        key: uuid(),
      };
    });
    return {
      total: data.length,
      success: true,
      data,
    };
  } else {
    const { total, data: apiarr } = apidata;
    const data = apiarr.map(op => {
      return {
        ...op,
        OrderTimestamp: timetrans(op.OrderTimestamp),
        DeadlineTimestamp: timetrans_sim(op.DeadlineTimestamp),
        BeginTimestamp: timetrans_sim(op.BeginTimestamp),
        EndTimestamp: timetrans_sim(op.EndTimestamp),
        key: uuid(),
      };
    });
    return {
      total: data.length,
      success: true,
      data,
    };
  }
}
