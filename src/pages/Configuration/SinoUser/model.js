import { message } from 'antd';
import { addSinoUser } from './service';

const Model = {
  namespace: 'sinoUserForm',
  state: {},
  effects: {
    *submitRegularForm({ payload }, { call }) {
      const { Result } = yield call(addSinoUser, payload);
      if (Result && Result === 'ok') {
        message.success('新增用户成功');
      } else {
        message.error(Result);
      }
    },
  },
};
export default Model;
