import { request } from 'umi';

// 分页查询
export async function queryUsers(params) {
  return request(`${NODE_API}/admin/user/queryUsers`, {
    method: 'GET',
    params,
  });
}

// 查询角色
export async function queryRoles(params) {
  return request(`${NODE_API}/admin/user/queryRoles`, {
    method: 'GET',
    params,
  });
}

// 更新用户
export async function update(params) {
  return request(`${NODE_API}/admin/user/update`, {
    method: 'POST',
    data: params,
  });
}

// 修改用户密码
export async function changePassword(params) {
  return request(`${NODE_API}/admin/user/changePassword`, {
    method: 'POST',
    data: params,
  });
}

// 下载用户导入模板
export async function template() {
  return request(`${NODE_API}/admin/user/template`, {
    method: 'GET',
    responseType: 'blob',
    getResponse: true,
  });
}

// 导入用户
export async function userImport(params) {
  return request(`${NODE_API}/admin/user/import`, {
    method: 'POST',
    data: params,
  });
}
