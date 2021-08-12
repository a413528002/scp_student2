import {request} from "umi";

// 查询贷款
export async function queryLoans(params) {
  return request(`${NODE_API}/student/lm/queryLoans`, {
    method: 'GET',
    params
  })
}

// 查询贷款利息
export async function queryLoanInterests(params) {
  return request(`${NODE_API}/student/lm/queryLoanInterests`, {
    method: 'GET',
    params
  })
}

// 保存存款利息
export async function updateLoanInterest(params) {
  return request(`${NODE_API}/student/lm/updateLoanInterest`, {
    method: 'POST',
    data: params
  })
}
