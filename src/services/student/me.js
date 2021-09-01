import { request } from 'umi';

// 查询存贷款利率
export async function queryDepositAndLoanInterestRate(params) {
  return request(`${NODE_API}/student/me/queryDepositAndLoanInterestRate`, {
    method: 'GET',
    params
  })
}

// 查询存贷款总量
export async function queryDepositAndLoanAmount(params) {
  return request(`${NODE_API}/student/me/queryDepositAndLoanAmount`, {
    method: 'GET',
    params
  })
}
