import { message } from 'antd';
import {
  queryBankBadAssets,
  queryCurBankBadAssets,
  updateBankBadAssets,
} from '@/services/student/bba';

const AssetModel = {
  namespace: 'studentAsset',
  state: { queryCurBankBadAssetsData: [], queryBankBadAssetsData: [] },
  effects: {
    // 查询当前期间不良资产
    *queryCurBankBadAssets({ payload }, { call, put }) {
      const response = yield call(queryCurBankBadAssets, payload) || [];
      if (!response.errCode) {
        const queryCurBankBadAssetsData = response.map((item) => {
          return {
            ...item,
            _key: item.bankBadAssetsId,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryCurBankBadAssetsData,
          },
        });
      }
    },

    // 查询不良资产
    *queryBankBadAssets({ payload }, { call, put }) {
      const response = yield call(queryBankBadAssets, payload) || [];
      if (!response.errCode) {
        const queryBankBadAssetsData = response.map((item, i) => {
          return {
            ...item,
            _key: item.bankBadAssetsId,
            serialNumber: i + 1,
          };
        });
        yield put({
          type: 'save',
          payload: {
            queryBankBadAssetsData,
          },
        });
      }
    },

    // 保存不良资产数据
    *updateBankBadAssets({ payload, callback }, { call, put }) {
      const response = yield call(updateBankBadAssets, payload);
      if (!response.errCode) {
        const { classHourId } = payload;
        message.success('保存成功');
        callback();
        // 刷新表格
        yield put({
          type: 'queryCurBankBadAssets',
          payload: {
            classHourId,
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
export default AssetModel;
