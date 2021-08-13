import {request} from "umi";

// 查询金融市场数据
export async function gdebtQueryFinancialMarkets(params) {
  return request(`${NODE_API}/student/gdebt/queryFinancialMarkets`, {
    method: 'GET',
    params
  })
}

// 债券抢单
export async function gdebtGrab(params) {
  return request(`${NODE_API}/student/gdebt/grab`, {
    method: 'POST',
    data:params
  })
}

// 查询债券抢单记录
export async function gdebtQueryLogs(params) {
  return request(`${NODE_API}/student/gdebt/queryLogs`, {
    method: 'GET',
    params
  })
}
