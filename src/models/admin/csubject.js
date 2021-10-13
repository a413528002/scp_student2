import { message } from 'antd';
import {
  createClassTemplateAccountingSubject,
  deleteClassTemplateAccountingSubject,
  queryClassTemplateAccountingSubjects,
  queryClassTemplates,
  queryEnums, updateClassTemplateAccountingSubject,
} from '@/services/admin/ctas';

const SubjectModel = {
  namespace: 'adminSubject',
  state: {
    queryClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplateAccountingSubjectsData: [],
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
          type: 'queryClassTemplateAccountingSubjects',
          payload: { classTemplateId },
        });
      }
    },
    // 查询课堂模板-科目
    *queryClassTemplateAccountingSubjects({ payload }, { call, put }) {
      const response = yield call(queryClassTemplateAccountingSubjects, payload);
      if (!response.errCode) {
        // 获取切换的classTemplateId 保存redux
        const { classTemplateId } = payload;
        const queryClassTemplateAccountingSubjectsData = response?.map((item) => {
          return {
            ...item,
            _key: item.id,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryClassTemplateAccountingSubjectsData,
            classTemplateId,
          },
        });
      }
    },
    // 删除课堂模板-科目
    *deleteClassTemplateAccountingSubject({ payload }, { call, put, select }) {
      const response = yield call(deleteClassTemplateAccountingSubject, payload);
      if (!response.errCode) {
        message.success('删除成功');
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminSubject.classTemplateId);
        yield put({
          type: 'queryClassTemplateAccountingSubjects',
          payload: { classTemplateId },
        });
      }
    },
    // 新建课堂模板-科目
    *createClassTemplateAccountingSubject({ payload, callback }, { call, put, select }) {
      const response = yield call(createClassTemplateAccountingSubject, payload);
      if (!response.errCode) {
        message.success('新建成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminSubject.classTemplateId);
        yield put({
          type: 'queryClassTemplateAccountingSubjects',
          payload: { classTemplateId },
        });
      }
    },
    // 修改课堂模板-科目
    *updateClassTemplateAccountingSubject({ payload, callback }, { call, put, select }) {
      const response = yield call(updateClassTemplateAccountingSubject, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminSubject.classTemplateId);
        yield put({
          type: 'queryClassTemplateAccountingSubjects',
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

export default SubjectModel;
