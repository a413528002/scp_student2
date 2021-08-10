import { createBankOrganization, queryBankOrganizations } from '@/services/student/bo';
import { message } from 'antd';

const OrganizationModel = {
  namespace: 'studentOrganization',
  state: {
    organizationData: [], // 机构
  },
  effects: {
    // 查询机构
    * queryBankOrganizations({payload}, {call, put}) {
      const response = yield call(queryBankOrganizations, payload)
      if (response.status === undefined) {
        const organizationData = response.map((item, index) => {
          return {
            ...item,
            _key: index
          }
        });

        yield put({
          type: 'save',
          payload: {
            organizationData
          }
        })
      }

    },
    // 创建机构
    * createBankOrganization({payload, callback}, {call, put}) {
      const response = yield call(createBankOrganization, payload)
      const {classHourId} = payload
      if (response.status === undefined) {
        message.success('新建成功')
        callback()
        yield put({
          type: 'queryBankOrganizations',
          payload: {classHourId}
        })
      }
    },
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  }
}
export default OrganizationModel
