import {
  queryBankOrganizations,
  queryBankPeriodInfos,
  queryBankWrongs,
} from '@/services/teacher/om';

const BusinessModel = {
  namespace: 'teacherBusiness',
  state: {
    queryBankWrongsData: {},
    queryBankPeriodInfosData: [],
    queryBankOrganizationsData: [],
    queryBankWrongsTotalElements: 0,
  },
  effects: {
    // 查询各个银行错误记录
    *queryBankWrongs({ payload }, { call, put }) {
      const response = yield call(queryBankWrongs, payload);
      if (!response.errCode) {
        const content = response['content'];
        const queryBankWrongsTotalElements = response['totalElements'];
        const queryBankWrongsData = {
          ...response,
          content: content?.map((item, index) => {
            return {
              ...item,
              _key: index,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankWrongsData,
            queryBankWrongsTotalElements,
          },
        });
      }
    },
    // 查询各个银行期间信息
    *queryBankPeriodInfos({ payload }, { call, put }) {
      const response = yield call(queryBankPeriodInfos, payload);
      if (!response.errCode) {
        const queryBankPeriodInfosData = response?.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankPeriodInfosData,
          },
        });
      }
    },
    // 查询各个银行机构信息
    *queryBankOrganizations({ payload }, { call, put }) {
      const response = yield call(queryBankOrganizations, payload);
      if (!response.errCode) {
        const queryBankOrganizationsData = response?.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankOrganizationsData,
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

export default BusinessModel;
