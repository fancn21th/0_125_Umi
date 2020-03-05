import uuid from '@/utils/uuid';
import isLoacal from '@/utils/islocal-paging';

export function dataTransform(apidata) {
  if (isLoacal(apidata)) {
    const data = apidata.map(item => ({ ...item, key: uuid() }));
    return { total: data.length, data, success: true };
  }
  const {
    data: apiarr,
    paging: { totalSize: total },
  } = apidata;
  const data = apiarr.map(item => ({ ...item, key: uuid() }));
  return { total, data, success: true };
}
