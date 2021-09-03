import { buyBankConsultation, queryBankConsultations, queryBankWrongs } from '@/services/student/bco';
import { message } from 'antd';

const ConsultationModel = {
  namespace: 'studentConsultation',
  state: {
    queryBankConsultationsTotalElements: null, // 第三方咨询数据总数
    queryBankConsultationsIsFirstPage: null, // 是否第一页
    queryBankConsultationsData: {}, // 第三方咨询数据
    queryBankWrongsData: [], // 明细数据
  },
  effects: {
    // 查询第三方质询
    *queryBankConsultations({ payload }, { call, put }) {
      const response = yield call(queryBankConsultations, { ...payload, sort: 'id,desc' });
      if (!response.errCode) {
        const content = response['content'];
        const queryBankConsultationsTotalElements = response['totalElements'];
        const queryBankConsultationsIsFirstPage = response['first'];
        const queryBankConsultationsData = {
          ...response,
          content: content?.map((item) => {
            return {
              ...item,
              _key: item.bankConsultationId,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankConsultationsTotalElements,
            queryBankConsultationsIsFirstPage,
            queryBankConsultationsData,
          },
        });
      }
    },
    // 查询错误明细
    *queryBankWrongs({ payload }, { call, put }) {
      const response = yield call(queryBankWrongs, payload);
      if (!response.errCode) {

        const queryBankWrongsData = response.map(item => {
          return {
            ...item,
            _key: item.bankWrongId,
          }
        })
        yield put({
          type: 'save',
          payload: {
            queryBankWrongsData,
          },
        });
      }
    },

    // 购买第三方质询
    *buyBankConsultation({ payload }, { call, put }) {
      const response = yield call(buyBankConsultation, { ...payload });
      if (!response.errCode) {
        message.success('购买成功');
        // 获取课堂id
        const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
        // 刷新表格
        yield put({
          type: 'queryBankConsultations',
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
export default ConsultationModel;
