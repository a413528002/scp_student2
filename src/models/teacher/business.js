import {
  queryBankGrabDetails,
  queryBankMarketings,
  queryBankOrganizations,
  queryBankPeriodInfos,
  queryBankWrongs,
} from '@/services/teacher/om';

const BusinessModel = {
  namespace: 'teacherBusiness',
  state: {
    queryBankWrongsData: {}, // 错误记录数据
    queryBankWrongsTotalElements: 0, // 错误记录数据总条数
    queryBankPeriodInfosData: [], // 银行期间数据
    queryBankOrganizationsData: [], // 银行机构数据
    queryBankMarketingsData: {}, // 营销费用数据
    queryBankMarketingsTotalElements: 0, // 营销费用数据总条数
    queryBankGrabDetailDataList: {}, // 银行抢单记录
  },
  effects: {
    // 查询各个银行错误记录
    *queryBankWrongs({ payload }, { call, put }) {
      const response = yield call(queryBankWrongs, payload);
      if (!response.errCode) {
        const { content, totalElements: queryBankWrongsTotalElements } = response;
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
    // 查询各个银行营销费用
    *queryBankMarketings({ payload }, { call, put }) {
      const response = yield call(queryBankMarketings, payload);
      if (!response.errCode) {
        const { content, totalElements: queryBankMarketingsTotalElements } = response;
        const queryBankMarketingsData = {
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
            queryBankMarketingsData,
            queryBankMarketingsTotalElements,
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
    // 查询银行抢单记录
    *queryBankGrabDetails({ payload }, { call, put }) {
      const response = yield call(queryBankGrabDetails, payload);
      if (!response.errCode) {
        const queryBankGrabDetailDataList = {};
        const queryBankGrabDetailData = response?.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        const { bizType } = payload;
        if (bizType === 'DPST') {
          // 存款抢单记录
          queryBankGrabDetailDataList[bizType] = queryBankGrabDetailData;
        } else if (bizType === 'LOAN') {
          // 贷款抢单记录
          queryBankGrabDetailDataList[bizType] = queryBankGrabDetailData;
        }
        yield put({
          type: 'save',
          payload: {
            queryBankGrabDetailDataList,
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
