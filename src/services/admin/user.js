import { request } from 'umi';

// 分页查询
export async function queryUsers(params) {
  return request(`${NODE_API}/admin/user/queryUsers`, {
    method: 'GET',
    params,
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
