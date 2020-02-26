import islocal from './islocal-total';

export function ApiTransformToData(apicargos, apioutcargos) {
  let sum = 0;
  let cargodata = apicargos;
  let outcargodata = apioutcargos;
  if (!islocal(apicargos)) {
    const { total, data } = apicargos;
    sum += total;
    cargodata = data;
  }
  if (!islocal(apioutcargos)) {
    const { total, data } = apicargos;
    sum += total;
    outcargodata = data;
  }
  const cargos = ApiTransformToArray(cargodata);
  const outcargos = ApiTransformToArray(outcargodata);
  const data = [...cargos, ...outcargos];
  return {
    total: sum ? sum : data.length,
    success: true,
    data,
  };
}

function ApiTransformToArray(data) {
  return data.reduce((acc, val) => {
    let { Cargos: cargos } = val;
    cargos = cargos.map(v => {
      const cargo = {
        ...v,
        ...val,
        Cargos: cargos.length,
        key: Date.now().toString(36),
      };
      return cargo;
    });
    return [...acc, ...cargos];
  }, []);
}
