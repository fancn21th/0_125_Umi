import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const { data: apiarr } = apidata;
  const data = apiarr.map(item => ({ ...item, key: uuid() }));
  return { total: data.length, data, success: true };
}
