import { message } from 'antd';
import { addSinoUser } from './service';

const Model = {
  namespace: 'sinoUserForm',
  state: {
    isCreated: false,
  },
  reducers: {
    getCreated(state, { payload }) {
      return { ...state, isCreated: payload };
    },
  },
  effects: {
    *submitRegularForm({ payload }, { call, put }) {
      yield put({
        type: 'getCreated',
        payload: false,
      });
      const { Result } = yield call(addSinoUser, payload);
      if (Result && Result === 'ok') {
        message.success('新增用户成功');
        yield put({
          type: 'getCreated',
          payload: true,
        });
      } else {
        message.error(Result);
      }
    },
  },
};
export default Model;
