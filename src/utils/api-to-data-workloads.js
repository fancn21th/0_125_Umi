import islocal from './islocal-total';

export function WorkloadsDataTranlate(apidata) {
  if (islocal) {
    return { data: apidata.data };
  } else {
    const { total, data } = apidata;
    return { total, data, success: true };
  }
}
