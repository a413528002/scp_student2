import { request } from 'umi';

// 查询列表
export async function queryBankRwaOperationals(params) {
  return request(`${NODE_API}/student/orwa/queryBankRwaOperationals`, {
    method: 'GET',
    params,
  });
}

// 保存操作风险
export async function updateBankRwaOperational(params) {
  return request(`${NODE_API}/student/orwa/updateBankRwaOperational`, {
    method: 'POST',
    data: params,
  });
}
