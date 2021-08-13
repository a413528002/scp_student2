import {request} from "umi";

// 查询金融市场数据
export async function gifQueryFinancialMarkets(params) {
  return request(`${NODE_API}/student/gif/queryFinancialMarkets`, {
    method: 'GET',
    params
  })
}

// 投融资抢单
export async function gifGrab(params) {
  return request(`${NODE_API}/student/gif/grab`, {
    method: 'POST',
    data: params
  })
}

// 查询投融资抢单记录
export async function gifQueryLogs(params) {
  return request(`${NODE_API}/student/gif/queryLogs`, {
    method: 'GET',
    params
  })
}
