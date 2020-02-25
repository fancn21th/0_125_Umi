import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const data = apidata.map(item => ({ ...item, key: uuid() }));
  return { total: data.length, data, success: true };
}
