import { queryBankOriginalCertificates } from '@/services/student/bv';

const CertificateModel = {
  namespace: 'studentCertificate',
  state: {
    queryBankOriginalCertificatesData: [],
  },
  effects: {
    // 查询原始凭证
    *queryBankOriginalCertificates({ payload }, { call, put }) {
      const response = yield call(queryBankOriginalCertificates, payload);
      if (!response.errCode) {
        const queryBankOriginalCertificatesData = response?.map((item) => {
          return {
            ...item,
            _key: item.bankOriginalCertificateId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankOriginalCertificatesData,
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
export default CertificateModel;
