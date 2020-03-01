import uuid from './uuid';
import isLoacal from './islocal-paging';

export function ApiTransformToData(apidata) {
  if (isLoacal(apidata)) {
    const data = apidata.map(item => ({ ...item, key: uuid() }));
    return { total: data.length, data, success: true };
  }
  const { data: apiarr } = apidata;
  const data = apiarr.map(item => ({ ...item, key: uuid() }));
  return { total: data.length, data, success: true };
}
