import {request} from "umi";

// 查询列表
export async function queryBankDepositReserves(params) {
  return request(`${NODE_API}/student/dr/queryBankDepositReserves`, {
    method: 'GET',
    params
  })
}

// 更新
export async function updateBankDepositReserve(params) {
  return request(`${NODE_API}/student/dr/updateBankDepositReserve`, {
    method: 'POST',
    data: params
  })
}
