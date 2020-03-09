import uuid from '@/utils/uuid';
import { timetrans, timetrans_sim } from '@/utils/date-transform';

import islocal from '@/utils/islocal-total';

export function dataTransform(apidata) {
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
