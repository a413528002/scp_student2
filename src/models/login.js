import {getQueryTenantOptions} from "@/services/login";

const LoginModel = {
  namespace: 'login',
  state: {
    loginQueryTenantOptions: []
  },
  effects: {
    // 获取用户信息
    * queryTenantOptions({payload}, {call, put}) {
      const response = yield call(getQueryTenantOptions, payload)
      if (response.status === undefined) {
        yield put({
          type: 'save',
          payload:{
            loginQueryTenantOptions:response
          }
        })
      }
    }
  },
  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        ...payload,
      }
    }
  },
}

export default LoginModel
