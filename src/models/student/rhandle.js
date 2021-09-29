import { message } from 'antd';
import { queryBankRwaOperationals, updateBankRwaOperational } from '@/services/student/orwa';

const HandleModel = {
  namespace: 'studentHandle',
  state: {
    queryBankRwaOperationalData: [],
  },
  effects: {
    // 查询列表
    *queryBankRwaOperationals({ payload }, { call, put }) {
      const response = yield call(queryBankRwaOperationals, payload) || [];
      if (!response.errCode) {
        const { bankRwaOperationals } = response;
        const queryBankRwaOperationalData = {
          ...response,
          bankRwaOperationals: bankRwaOperationals.map((item) => {
            return {
              ...item,
              _key: item.bankRwaOperationalId,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankRwaOperationalData,
          },
        });
      }
    },

    // 保存操作风险
    *updateBankRwaOperational({ payload, callback }, { call, put }) {
      const response = yield call(updateBankRwaOperational, payload);
      if (!response.errCode) {
        const {classHourId} = payload
        message.success('保存成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryBankRwaOperationals',
          payload: {
            classHourId,
          },
        });
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
export default HandleModel;
