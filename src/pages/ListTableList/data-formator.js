export function DatatransformToCargos(data) {
  const list = data.reduce((acc, val) => {
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
    total: list.length,
    success: true,
    data: list,
  };
}
