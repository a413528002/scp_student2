import { request } from 'umi';

// 查询薪资/费用
export async function queryBankExpenses(params) {
  return request(`${NODE_API}/student/be/queryBankExpenses`, {
    method: 'GET',
    params,
  });
}

// 更新费用
export async function updateBankExpense(params) {
  return request(`${NODE_API}/student/be/updateBankExpense`, {
    method: 'POST',
    data: params,
  });
}
