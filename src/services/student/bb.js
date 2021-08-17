import { request } from 'umi';

// 查询列表
export async function queryBankruptcies(params) {
  return request(`${NODE_API}/student/bb/queryBankruptcies`, {
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
