import {request} from "umi";

// 查询存款
export async function queryDeposits(params) {
  return request(`${NODE_API}/student/dm/queryDeposits`, {
    method: 'GET',
    params
  })
}

// 查询存款利息
export async function queryDepositInterests(params) {
  return request(`${NODE_API}/student/dm/queryDepositInterests`, {
    method: 'GET',
    params
  })
}

// 保存存款利息
export async function updateDepositInterest(params) {
  return request(`${NODE_API}/student/dm/updateDepositInterest`, {
    method: 'POST',
    data: params
  })
}
