import islocal from './islocal-total';

export function WorkloadsDataTranlate(apidata) {
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
        };
      })
      .filter(item => item.Total && item.Total !== 0);
    return { total: data.length, data, success: true };
  }
}
