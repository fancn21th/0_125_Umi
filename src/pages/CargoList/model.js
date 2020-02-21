import { queryCargoNoList } from './service';

const Model = {
  namespace: 'cargolist',
  state: {
    cargoNoList: [],
  },
  reducers: {
    getCargoNoList(state, { payload }) {
      return { ...state, cargoNoList: payload };
    },
  },
  effects: {
    *fetchCargoNoList({ payload }, { call, put }) {
      const response = yield call(queryCargoNoList, payload);
      yield put({
        type: 'getCargoNoList',
        payload: response,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/cargo/cargolist') {
          dispatch({
            type: 'fetchCargoNoList',
          });
        }
      });
    },
  },
};

export default Model;
