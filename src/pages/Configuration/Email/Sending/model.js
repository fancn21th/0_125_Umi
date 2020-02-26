import { message } from 'antd';
import { addEmailSendConfig, queryEmailSendConfig } from './service';

const Model = {
  namespace: 'emailSenderForm',
  state: {
    sender: null,
  },
  reducers: {
    getEmailSendConfig(state, { payload }) {
      return { ...state, sender: payload };
    },
  },
  effects: {
    *submitRegularForm({ payload }, { call }) {
      yield call(addEmailSendConfig, payload);
      message.success('提交成功');
    },
    *fetchEmailSendConfig({ payload }, { call, put }) {
      const response = yield call(queryEmailSendConfig, payload);
      yield put({
        type: 'getEmailSendConfig',
        payload: response,
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/config/email/sending') {
          dispatch({
            type: 'fetchEmailSendConfig',
          });
        }
      });
    },
  },
};
export default Model;
