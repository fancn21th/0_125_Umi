import islocal from './islocal-total';

export function WorkloadsDataTranlate(apidata) {
  if (islocal(apidata)) {
    return { total: apidata.length, data: apidata, success: true };
  } else {
    const { total, data } = apidata;
    return { total, data, success: true };
  }
}
