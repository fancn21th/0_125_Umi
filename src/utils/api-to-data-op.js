import uuid from './uuid';
import { timetrans, timetrans_sim } from "./date-transform"

export function ApiTransformToData(apidata) {
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
    total: apidata.length,
    success: true,
    data,
  };
}
