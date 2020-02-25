import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const data = apidata.reduce((acc, val) => {
    let { isbro: isbros } = val;
    isbros = isbros.map(v => {
      return {
        ...val,
        brokenInfo: `破损数：${v.brokenCount} 破损类型：${v.brokenType}`,
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
