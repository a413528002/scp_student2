import { buyBankConsultation, queryBankConsultations } from '@/services/student/bco';
import { message } from 'antd';

const ConsultationModel = {
  namespace: 'studentConsultation',
  state: {
    queryBankConsultationsTotalElements: null,
    queryBankConsultationsData: {},
  },
  effects: {
    // 查询第三方质询
    *queryBankConsultations({ payload }, { call, put }) {
      const response = yield call(queryBankConsultations, payload);
      if (!response.errCode) {
        const content = response['content'];
        const queryBankConsultationsTotalElements = response['totalElements'];
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
            queryBankConsultationsData,
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
