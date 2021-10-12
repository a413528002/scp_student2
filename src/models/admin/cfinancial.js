import { message } from 'antd';
import {
  createClassTemplateFinancialMarket,
  deleteClassTemplateFinancialMarket,
  queryClassTemplateFinancialMarkets,
  queryEnums,
  queryFMClassTemplates,
  updateClassTemplateFinancialMarket,
} from '@/services/admin/ctfm';

const FinancialModel = {
  namespace: 'adminFinancial',
  state: {
    queryFMClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplatesData: [],
    queryEnumsData: [],
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
    // 删除课堂模板-金融数据
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
    // 新建课堂模板-金融数据
    *createClassTemplateFinancialMarket({ payload, callback }, { call, put, select }) {
      const response = yield call(createClassTemplateFinancialMarket, payload);
      if (!response.errCode) {
        message.success('新建成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminFinancial.classTemplateId);
        yield put({
          type: 'queryClassTemplateFinancialMarkets',
          payload: { classTemplateId },
        });
      }
    },
    // 修改课堂模板-金融数据
    *updateClassTemplateFinancialMarket({ payload, callback }, { call, put, select }) {
      const response = yield call(updateClassTemplateFinancialMarket, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminFinancial.classTemplateId);
        yield put({
          type: 'queryClassTemplateFinancialMarkets',
          payload: { classTemplateId },
        });
      }
    },
    // 查询枚举
    *queryEnums({ payload }, { call, put }) {
      const response = yield call(queryEnums, payload);
      if (!response.errCode) {
        // key转换
        const queryEnumsData = JSON.parse(
          JSON.stringify(response)
            .replace(/"id"/g, '"value"')
            .replace(/"name"/g, '"text"'),
        );
        yield put({
          type: 'save',
          payload: { queryEnumsData },
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
