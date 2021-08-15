import { request } from "umi";

// 登录
export async function getLogin(params) {
  return request(`${NODE_API}/login`, {
    method: 'POST',
    data:params
  })
}

// 获取租户选项
export async function getQueryTenantOptions(options) {
  return request(`${NODE_API}/queryTenantOptions`, {
    method: 'GET',
    ...(options || {}),
  })
}
// 退出登录
export async function getLogout() {
  return request(`${NODE_API}/logout`, {
    method: 'POST',
  })
}
