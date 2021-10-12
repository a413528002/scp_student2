import { message } from 'antd';
import {
  queryClassTemplateVoucher,
  queryVClassTemplates,
  queryEnums,
  deleteClassTemplateVoucher, createClassTemplateVoucher, updateClassTemplateVoucher,
} from '@/services/admin/ctv';

const VoucherModel = {
  namespace: 'adminVoucher',
  state: {
    queryVClassTemplatesData: [],
    classTemplateId: null,
    queryClassTemplateVoucherData: [],
    queryEnumsData: [],
  },
  effects: {
    // 查询课堂模板
    *queryVClassTemplates({ payload }, { call, put }) {
      const response = yield call(queryVClassTemplates, payload);
      if (!response.errCode) {
        const { id: classTemplateId } = response?.reverse()[0];
        yield put({
          type: 'save',
          payload: {
            queryVClassTemplatesData: response,
            classTemplateId,
          },
        });
        yield put({
          type: 'queryClassTemplateVoucher',
          payload: { classTemplateId },
        });
      }
    },
    // 查询课堂模板-凭证引擎配置
    *queryClassTemplateVoucher({ payload }, { call, put }) {
      const response = yield call(queryClassTemplateVoucher, payload);
      if (!response.errCode) {
        // 获取切换的classTemplateId 保存redux
        const { classTemplateId } = payload;
        const queryClassTemplateVoucherData = response?.map((item) => {
          return {
            ...item,
            _key: item.id,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryClassTemplateVoucherData,
            classTemplateId,
          },
        });
      }
    },
    // 删除课堂模板-凭证引擎配置
    *deleteClassTemplateVoucher({ payload }, { call, put, select }) {
      const response = yield call(deleteClassTemplateVoucher, payload);
      if (!response.errCode) {
        message.success('删除成功');
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVoucher.classTemplateId);
        yield put({
          type: 'queryClassTemplateVoucher',
          payload: { classTemplateId },
        });
      }
    },
    // 新建课堂模板-凭证引擎配置
    *createClassTemplateVoucher({ payload, callback }, { call, put, select }) {
      const response = yield call(createClassTemplateVoucher, payload);
      if (!response.errCode) {
        message.success('新建成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVoucher.classTemplateId);
        yield put({
          type: 'queryClassTemplateVoucher',
          payload: { classTemplateId },
        });
      }
    },
    // 修改课堂模板-凭证引擎配置
    *updateClassTemplateVoucher({ payload, callback }, { call, put, select }) {
      const response = yield call(updateClassTemplateVoucher, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 获取classTemplateId
        const classTemplateId = yield select((state) => state.adminVoucher.classTemplateId);
        yield put({
          type: 'queryClassTemplateVoucher',
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

export default VoucherModel;
