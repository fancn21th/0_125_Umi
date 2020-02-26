import uuid from './uuid';
import islocal from './islocal-total';

export function ApiTransformToData(apidata) {
  if (islocal(apidata)) {
    const data = apidata.map(log => {
      return {
        ...log,
        Flag: log.Flag ? 'true' : 'false',
        key: uuid(),
      };
    });
    return data;
  } else {
    const { data: apiarr } = apidata;
    const data = apiarr.map(log => {
      return {
        ...log,
        Flag: log.Flag ? 'true' : 'false',
        key: uuid(),
      };
    });
    return data;
  }
}
