import uuid from './uuid';

export function ApiTransformToData(apidata) {
  const { data: apiarr } = apidata;
  const data = apiarr.reduce((acc, val) => {
    let { Isbro: isbros } = val;
    isbros = isbros.map(v => {
      return {
        ...val,
        brokenInfo: `破损数：${v.BrokenCount} 破损类型：${v.BrokenType}`,
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
