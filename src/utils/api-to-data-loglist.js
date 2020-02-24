import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const data = apidata.map(log => {
    return {
      ...log,
      Flag: log.Flag ? 'true' : 'false',
      key: uuid(),
    };
  });
  return data;
}
