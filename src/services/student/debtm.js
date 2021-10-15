import { request } from 'umi';

// 查询债券
export async function queryDebts(params) {
  return request(`${NODE_API}/student/debtm/queryDebts`, {
    method: 'GET',
    params,
  });
}

// 查询债券利息
export async function queryDebtInterests(params) {
  return request(`${NODE_API}/student/debtm/queryDebtInterests`, {
    method: 'GET',
    params,
  });
}

// 卖出债券
export async function sellDebt(params) {
  return request(`${NODE_API}/student/debtm/sellDebt`, {
    method: 'POST',
    data: params,
  });
}

// 保存债券利息
export async function updateDebtInterest(params) {
  return request(`${NODE_API}/student/debtm/updateDebtInterest`, {
    method: 'POST',
    data: params,
  });
}
