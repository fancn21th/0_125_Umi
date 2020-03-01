import islocal from './islocal-total';
import uuid from './uuid';

export function ApiTransformToData(apicargos, apioutcargos) {
  // let sum = 0;
  let cargodata = apicargos;
  let outcargodata = apioutcargos;
  if (!islocal(apicargos)) {
    const { total, data } = apicargos;
    // sum += total;
    cargodata = data;
  }
  if (!islocal(apioutcargos)) {
    const { total, data } = apioutcargos;
    // sum += total;
    outcargodata = data;
  }
  const cargos = ApiTransformToArray(cargodata);
  const outcargos = ApiTransformToArray(outcargodata);
  const data = [...cargos, ...outcargos];
  return {
    total: data.length,
    success: true,
    data,
  };
}

function ApiTransformToArray(data) {
  return data.map(item => {
    let { Cargos } = item;
    Cargos = Cargos.map(i => {
      return {
        ...i,
        key: uuid(),
      };
    });
    return {
      ...item,
      lineLen: Cargos.length,
      Cargos,
      key: uuid(),
    };
  });
}
