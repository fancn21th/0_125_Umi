import { queryData } from './service';

const Model = {
  namespace: 'shelfUtilization',
  state: {
    data: [],
  },
  reducers: {
    getChartData(state, { payload }) {
      return { ...state, data: payload };
    },
  },
  effects: {
    *fetchChartData({ payload }, { call, put }) {
      const response = yield call(queryData, payload);
      yield put({
        type: 'getChartData',
        payload: response,
      });
    },
  },
};
export default Model;
