import { queryBankRanks } from '@/services/teacher/bankRank';

const RankingModel = {
  namespace: 'teacherRanking',
  state: {
    queryBankRanksData: [],
  },
  effects: {
    *queryBankRanksData({ payload }, { call, put }) {
      const response = yield call(queryBankRanks, payload);
      if (!response.errCode) {
        const { bankScoreRanks } = response;
        const queryBankRanksData = {
          ...response,
          bankScoreRanks: bankScoreRanks.map((item, index) => {
            return {
              ...item,
              _key: index,
            };
          }),
        };
        yield put({
          type: 'save',
          payload: {
            queryBankRanksData,
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

export default RankingModel;
