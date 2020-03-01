import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const { data: apiarr } = apidata;
  return apiarr.map(item => ({ ...item, key: uuid() }));
}
