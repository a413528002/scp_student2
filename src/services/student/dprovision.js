import {request} from "umi";

// 查询列表
export async function queryBankLoanProvisions(params) {
  return request(`${NODE_API}/student/lp/queryBankLoanProvisions`, {
    method: 'GET',
    params
  })
}

// 更新
export async function updateBankLoanProvision(params) {
  return request(`${NODE_API}/student/lp/updateBankLoanProvision`, {
    method: 'POST',
    data: params
  })
}
