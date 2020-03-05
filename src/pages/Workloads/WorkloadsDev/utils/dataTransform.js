import islocal from '@/utils/islocal-total';
import uuid from '@/utils/uuid';

export function dataTransform(apidata) {
  if (islocal(apidata)) {
    const data = apidata.map(item => {
      const { Receipt, Pick, Shelve, Move, Ship } = item;
      const Total = Receipt + Pick + Shelve + Move + Ship;
      return {
        ...item,
        Total,
      };
    });
    return { total: data.length, data, success: true };
  } else {
    const { data: apiarr } = apidata;
    const data = apiarr
      .map(item => {
        const { Receipt, Pick, Shelve, Move, Ship } = item;
        const Total = Receipt + Pick + Shelve + Move + Ship;
        return {
          ...item,
          Total,
          key: uuid(),
        };
      })
      .filter(item => item.Total && item.Total !== 0);
    return { total: data.length, data, success: true };
  }
}
