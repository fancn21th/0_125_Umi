import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const data = apidata.reduce((acc, val) => {
    let { Isbro: isbros } = val;
    isbros = isbros.map(v => {
      return {
        ...v,
        ...val,
        key: uuid(),
      };
    });
    return [...acc, ...isbros];
  }, []);
  return {
    total: data.length,
    success: true,
    data,
  };
}
