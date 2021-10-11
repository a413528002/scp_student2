import { message } from 'antd';
import {createClassTemplate, queryClassTemplates, updateClassTemplate} from '@/services/admin/manage';

const ManageModel = {
  namespace: 'adminManage',
  state: {
    queryClassTemplatesData: {},
  },
  effects: {
    // 查询课堂模板
    *queryClassTemplates({ payload }, { call, put }) {
      const response = yield call(queryClassTemplates, payload);
      if (!response.errCode) {
        const { content } = response;
        const queryClassTemplatesData = {
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
            queryClassTemplatesData,
          },
        });
      }
    },

    // 新建课堂模板
    *createClassTemplate({ payload, callback }, { call, put }) {
      const response = yield call(createClassTemplate, payload);
      if (!response.errCode) {
        message.success('新增成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryClassTemplates',
          payload: { page: 0, size: 10, sort: 'id,desc' },
        });
      }
    },

    // 修改课堂模板
    *updateClassTemplate({ payload, callback }, { call, put }) {
      const response = yield call(updateClassTemplate, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryClassTemplates',
          payload: { page: 0, size: 10, sort: 'id,desc' },
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

export default ManageModel;
