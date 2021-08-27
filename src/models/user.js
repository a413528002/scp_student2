import { changeNickname, changePassword, queryCurrentUser } from '@/services/user';
import { message } from 'antd';

const UserModel = {
  namespace: 'user',
  state: {
    queryCurrentUserData: {},
  },
  effects: {
    // 获取用户信息
    *queryCurrentUser({ payload }, { call, put }) {
      const response = yield call(queryCurrentUser, payload);
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: {
            queryCurrentUserData: response,
          },
        });
      }
    },
    // 修改昵称
    *changeNickname({ payload }, { call, put }) {
      const response = yield call(changeNickname, payload);
      if (!response.errCode) {
        message.success('昵称修改成功');
        yield put({
          type: 'queryCurrentUser',
        });
      }
    },
    // 修改密码
    *changePassword({ payload, callback }, { call }) {
      const response = yield call(changePassword, payload);
      if (!response.errCode) {
        message.success('密码修改成功');
        callback();
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
  },
};

export default UserModel;
