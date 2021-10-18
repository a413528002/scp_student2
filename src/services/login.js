import { request } from 'umi';

// 登录
export async function getLogin(params) {
  return request(`${NODE_API}/login`, {
    method: 'POST',
    data: params,
  });
}

// 获取租户选项
export async function getQueryTenantOptions(options) {
  return request(`${NODE_API}/queryTenantOptions`, {
    method: 'GET',
    ...(options || {}),
  });
}

// 退出登录
export async function getLogout() {
  return request(`${NODE_API}/logout`, {
    method: 'POST',
  });
}

// 查询租户LOGO
export async function queryTenantLogo() {
  return request(`${NODE_API}/queryTenantLogo`, {
    headers: { 'Content-Type': 'image/svg+xml' },
    method: 'GET',
  });
}
