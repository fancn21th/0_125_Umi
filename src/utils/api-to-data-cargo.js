export function ApiTransformToData(apidata) {
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
    data
  };
}
