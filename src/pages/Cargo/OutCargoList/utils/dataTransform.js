import islocal from '@/utils/islocal-total';
import uuid from '@/utils/uuid';

export function dataTransform(apidata) {
  if (islocal(apidata)) {
    const data = apidata.map(item => {
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
    return {
      total: data.length,
      success: true,
      data,
    };
  } else {
    const { total, data: apiarr } = apidata;
    const data = apiarr.map(item => {
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
    return {
      total,
      success: true,
      data,
    };
  }
}
