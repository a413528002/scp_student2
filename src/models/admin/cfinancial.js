import { message } from 'antd';
import {
  deleteClassTemplateFinancialMarket,
  queryClassTemplateFinancialMarkets,
  queryFMClassTemplates,
} from '@/services/admin/ctfm';

const FinancialModel = {
  namespace: 'adminFinancial',
  state: {
    queryFMClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplatesData: [],
  },
  effects: {
    // 查询课堂模板
    *queryFMClassTemplates({ payload }, { call, put }) {
      const response = yield call(queryFMClassTemplates, payload);
      if (!response.errCode) {
        const { id: classTemplateId } = response?.reverse()[0];
        yield put({
          type: 'save',
          payload: {
            queryFMClassTemplatesData: response,
            classTemplateId,
          },
        });
        yield put({
          type: 'queryClassTemplateFinancialMarkets',
          payload: { classTemplateId },
        });
      }
    },
    // 查询课堂模板-科目
    *queryClassTemplateFinancialMarkets({ payload }, { call, put }) {
      const response = yield call(queryClassTemplateFinancialMarkets, payload);
      if (!response.errCode) {
        // 获取切换的classTemplateId 保存redux
        const { classTemplateId } = payload;
        const queryClassTemplatesData = response?.map((item) => {
          return {
            ...item,
            _key: item.id,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryClassTemplatesData,
            classTemplateId,
          },
        });
      }
    },
    // 查询课堂模板-科目
    *deleteClassTemplateFinancialMarket({ payload }, { call, put, select }) {
      const response = yield call(deleteClassTemplateFinancialMarket, payload);
      if (!response.errCode) {
        message.success('删除成功');
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminFinancial.classTemplateId);
        yield put({
          type: 'queryClassTemplateFinancialMarkets',
          payload: { classTemplateId },
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

export default FinancialModel;
