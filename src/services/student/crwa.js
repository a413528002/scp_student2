import { request } from 'umi';

// 查询列表
export async function queryBankRwaCredits(params) {
  return request(`${NODE_API}/student/crwa/queryBankRwaCredits`, {
    method: 'GET',
    params,
  });
}

// 保存信用风险
export async function updateBankRwaCredit(params) {
  return request(`${NODE_API}/student/crwa/updateBankRwaCredit`, {
    method: 'POST',
    data: params,
  });
}
