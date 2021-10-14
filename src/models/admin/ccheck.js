import {
  queryClassTemplateManualBookChecks,
  queryClassTemplates,
  queryEnums,
} from '@/services/admin/ctmbc';

const CheckModel = {
  namespace: 'adminCheck',
  state: {
    queryClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplateManualBookChecksData: [],
    queryEnumsData: [],
  },
  effects: {
    // 查询课堂模板
    *queryClassTemplates({ payload }, { call, put }) {
      const response = yield call(queryClassTemplates, payload);
      if (!response.errCode) {
        const { id: classTemplateId } = response?.reverse()[0];
        yield put({
          type: 'save',
          payload: {
            queryClassTemplatesData: response,
            classTemplateId,
          },
        });
        yield put({
          type: 'queryClassTemplateManualBookChecks',
          payload: { classTemplateId },
        });
      }
    },
    // 查询课堂模板-账务检查
    *queryClassTemplateManualBookChecks({ payload }, { call, put }) {
      const response = yield call(queryClassTemplateManualBookChecks, payload);
      if (!response.errCode) {
        // 获取切换的classTemplateId 保存redux
        const { classTemplateId } = payload;
        const queryClassTemplateManualBookChecksData = response?.map((item) => {
          return {
            ...item,
            _key: item.id,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryClassTemplateManualBookChecksData,
            classTemplateId,
          },
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

export default CheckModel;
