export function ApiTransformToData(apicargos, apioutcargos) {
  const cargos = ApiTransformToArray(apicargos);
  const outcargos = ApiTransformToArray(apioutcargos);
  const data = [...cargos, ...outcargos];
  return {
    total: data.length,
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
