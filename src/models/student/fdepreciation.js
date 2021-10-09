import { message } from 'antd';
import {
  queryBankDepreciations,
  queryCurBankDepreciations,
  updateBankDepreciation,
} from '@/services/student/bd';

const DepreciationModel = {
  namespace: 'studentDepreciation',
  state: {
    queryCurBankDepreciationData: [], // 当前期间折旧管理数据
    queryBankDepreciationData: [], // 折旧管理数据
  },
  effects: {
    // 查询折旧管理数据
    *queryBankDepreciations({ payload }, { call, put }) {
      const response = yield call(queryBankDepreciations, payload);
      if (!response.errCode) {
        const queryBankDepreciationData = response?.map((item) => {
          return {
            ...item,
            _key: item.bankDepreciationId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankDepreciationData,
          },
        });
      }
    },

    // 查询当前期间折旧管理数据
    *queryCurBankDepreciations({ payload, callback }, { call, put }) {
      const response = yield call(queryCurBankDepreciations, payload);
      if (!response.errCode) {
        const queryCurBankDepreciationData = response?.map((item) => {
          return {
            ...item,
            _key: item.bankDepreciationId,
          };
        });
        yield put({
          type: 'save',
          payload: { queryCurBankDepreciationData },
        });
      }
    },
    // 更新费用
    *updateBankDepreciation({ payload,callback }, { call, put }) {
      const response = yield call(updateBankDepreciation, payload);
      if (!response.errCode) {
        const { classHourId } = payload;
        message.success('保存成功');
        callback()
        yield put({
          type: 'queryCurBankDepreciations',
          payload: { classHourId },
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
export default DepreciationModel;
