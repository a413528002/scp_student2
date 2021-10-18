import { message } from 'antd';
import { queryCurrentTenant, updateCurrentTenant } from '@/services/admin/tenant';

const TenantModel = {
  namespace: 'adminTenant',
  state: {
    queryCurrentTenantData: {},
  },
  effects: {
    // 查询当前租户
    *queryCurrentTenant({ payload }, { call, put }) {
      const response = yield call(queryCurrentTenant, payload);
      if (!response.errCode) {
        yield put({
          type: 'save',
          payload: {
            queryCurrentTenantData: response,
          },
        });
      }
    },
    // 修改当前租户信息
    *updateCurrentTenant({ payload, callback }, { call, put }) {
      const response = yield call(updateCurrentTenant, payload);
      if (!response.errCode) {
        message.success('修改成功');
        callback();
        // 刷新租户信息数据
        yield put({
          type: 'queryCurrentTenant',
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

export default TenantModel;
