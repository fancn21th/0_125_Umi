import islocal from './islocal-total';

export function ApiTransformToData(apidata) {
  if (islocal(apidata)) {
    const data = apidata.reduce((acc, val) => {
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
    return {
      total: data.length,
      success: true,
      data,
    };
  } else {
    const { total, data: apiarr } = apidata;
    const data = apiarr.reduce((acc, val) => {
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
    return {
      total,
      success: true,
      data,
    };
  }
}
