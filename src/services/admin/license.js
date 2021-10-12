import { request } from 'umi';

// 查询LICENSE
export async function queryLicenseContent(params) {
  return request(`${NODE_API}/admin/license/queryLicenseContent`, {
    method: 'GET',
    params,
  });
}

// 激活码激活
export async function activateByActivationCode(params) {
  return request(`${NODE_API}/admin/license/activateByActivationCode`, {
    method: 'POST',
    data: params,
  });
}

// 生成申请码
export async function generateRequestCode(params) {
  return request(`${NODE_API}/admin/license/generateRequestCode`, {
    method: 'POST',
    data: params,
  });
}
