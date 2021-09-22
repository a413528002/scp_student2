import { request } from 'umi';

// 查询列表
export async function queryBankInjectMonies(params) {
  return request(`${NODE_API}/student/bb/queryBankInjectMonies`, {
    method: 'GET',
    params,
  });
}

// 注资申请
export async function applyForInject(params) {
  return request(`${NODE_API}/student/bb/applyForInject`, {
    method: 'POST',
    data: params,
  });
}
