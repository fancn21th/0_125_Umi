import uuid from '@/utils/uuid';
import moment from 'moment';

export function dataTransform(apidata) {
  const { data: apiarr } = apidata;
  const data = apiarr.map(item => {
    return {
      ...item,
      OrderTimestamp:
        item.OrderTimestamp && moment(+item.OrderTimestamp).format('YYYY-MM-DD HH:mm:ss'),
      DeadlineTimestamp:
        item.DeadlineTimestamp && moment(+item.DeadlineTimestamp).format('YYYY-MM-DD HH:mm:ss'),
      BeginTimestamp:
        item.BeginTimestamp && moment(+item.BeginTimestamp).format('YYYY-MM-DD HH:mm:ss'),
      EndTimestamp: item.EndTimestamp && moment(+item.EndTimestamp).format('YYYY-MM-DD HH:mm:ss'),
      key: uuid(),
    };
  });
  return { total: data.length, data, success: true };
}
