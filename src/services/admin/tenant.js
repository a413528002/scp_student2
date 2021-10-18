import { request } from 'umi';

// 查询当前租户
export async function queryCurrentTenant(params) {
  return request(`${NODE_API}/admin/tenant/queryCurrentTenant`, {
    method: 'GET',
    params,
  });
}

// 修改当前租户信息
export async function updateCurrentTenant(params) {
  return request(`${NODE_API}/admin/tenant/updateCurrentTenant`, {
    method: 'POST',
    data: params,
  });
}
