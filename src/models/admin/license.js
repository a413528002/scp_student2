import { message } from 'antd';
import {
  activateByActivationCode,
  generateRequestCode,
  queryLicenseContent,
} from '@/services/admin/license';

const LicenseModel = {
  namespace: 'adminLicense',
  state: {
    queryLicenseContentData: [],
    generateRequestCodeData: {},
  },
  effects: {
    // 查询LICENSE
    *queryLicenseContent({ payload }, { call, put }) {
      const response = yield call(queryLicenseContent, payload);
      if (!response.errCode) {
        const queryLicenseContentData = response?.map((item, index) => {
          return {
            ...item,
            _key: index,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryLicenseContentData,
          },
        });
      }
    },
    // 生成申请码
    *generateRequestCode({ payload }, { call, put }) {
      const response = yield call(generateRequestCode, payload);
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: {
            generateRequestCodeData: response,
          },
        });
      }
    },
    // 激活码激活
    *activateByActivationCode({ payload, callback }, { call, put }) {
      const response = yield call(activateByActivationCode, payload);
      if (!response.errCode) {
        message.success('激活成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryLicenseContent',
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

export default LicenseModel;
