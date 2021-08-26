import {
  getStudentInputMarketingCost,
  getStudentQueryBankMarketings,
  getStudentQueryCurBankMarketing,
} from '@/services/student/bm';
import { message } from 'antd';

const MarketingModel = {
  namespace: 'studentMarketing',
  state: {
    bankMarketingData: [], // 当前数据
    bankMarketingsData: [], // 往期数据
  },
  effects: {
    // 根据银行ID查询当前期间银行营销信息
    *queryCurBankMarketing({ payload }, { call, put }) {
      const response = yield call(getStudentQueryCurBankMarketing, payload);
      if (!response.errCode) {
        const bankMarketingData = [response]?.map((item, index) => {
          return {
            ...item,
            _key: index,
            // depositMktCost: item.depositMktCost === null ? 0 : item.depositMktCost,
            // loanMktCost: item.loanMktCost === null ? 0 : item.loanMktCost,
          };
        });
        yield put({
          type: 'save',
          payload: {
            bankMarketingData,
          },
        });
      }
    },
    // 投入营销费用
    *inputMarketingCost({ payload, callback }, { call, put }) {
      const response = yield call(getStudentInputMarketingCost, payload);
      if (!response.errCode) {
        callback();
        message.success('提交成功');
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        yield put({
          type: 'queryCurBankMarketing',
          payload: { classHourId },
        });
        // 刷新查询往期投入
        yield put({
          type: 'queryBankMarketings',
          payload: { classHourId },
        });
      }
    },
    // 查询往期投入
    *queryBankMarketings({ payload }, { call, put }) {
      const response = yield call(getStudentQueryBankMarketings, payload);
      if (!response.errCode) {
        const bankMarketingsData = response.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        yield put({
          type: 'save',
          payload: {
            bankMarketingsData,
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
export default MarketingModel;
