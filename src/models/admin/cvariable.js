import { message } from 'antd';
import {
  createClassTemplateVariable,
  deleteClassTemplateVariable,
  queryClassTemplates,
  queryClassTemplateVariables,
  updateClassTemplateVariable,
  queryEnums,
} from '@/services/admin/ctvar';

const VariableModel = {
  namespace: 'adminVariable',
  state: {
    queryClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplateVariablesData: [],
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
          type: 'queryClassTemplateVariables',
          payload: { classTemplateId },
        });
      }
    },
    // 查询课堂模板-变量
    *queryClassTemplateVariables({ payload }, { call, put }) {
      const response = yield call(queryClassTemplateVariables, payload);
      if (!response.errCode) {
        // 获取切换的classTemplateId 保存redux
        const { classTemplateId } = payload;
        const queryClassTemplateVariablesData = response?.map((item) => {
          return {
            ...item,
            _key: item.id,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryClassTemplateVariablesData,
            classTemplateId,
          },
        });
      }
    },
    // 删除课堂模板-变量
    *deleteClassTemplateVariable({ payload }, { call, put, select }) {
      const response = yield call(deleteClassTemplateVariable, payload);
      if (!response.errCode) {
        message.success('删除成功');
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVariable.classTemplateId);
        yield put({
          type: 'queryClassTemplateVariables',
          payload: { classTemplateId },
        });
      }
    },
    // 新建课堂模板-变量
    *createClassTemplateVariable({ payload, callback }, { call, put, select }) {
      const response = yield call(createClassTemplateVariable, payload);
      if (!response.errCode) {
        message.success('新建成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVariable.classTemplateId);
        yield put({
          type: 'queryClassTemplateVariables',
          payload: { classTemplateId },
        });
      }
    },
    // 修改课堂模板-变量
    *updateClassTemplateVariable({ payload, callback }, { call, put, select }) {
      const response = yield call(updateClassTemplateVariable, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVariable.classTemplateId);
        yield put({
          type: 'queryClassTemplateVariables',
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

export default VariableModel;
