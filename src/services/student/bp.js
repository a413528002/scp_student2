import { request } from 'umi';

// 查询银行战略规划
export async function queryBankPlan(params) {
  return request(`${NODE_API}/student/bp/queryBankPlan`, {
    method: 'GET',
    params,
  });
}

// 提交银行战略规划
export async function submitBankPlan(params) {
  return request(`${NODE_API}/student/bp/submitBankPlan`, {
    method: 'POST',
    data: params,
  });
}
