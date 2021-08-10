import { request } from 'umi';

// 存款抢单
export async function grab(params) {
  return request(`${NODE_API}/student/gdpst/grab`, {
    method: 'POST',
    data: params
  })
}


// 查询存款抢单记录
export async function queryLogs(params) {
  return request(`${NODE_API}/student/gdpst/queryLogs`, {
    method: 'GET',
    params
  })
}

// 查询金融市场
export async function queryFinancialMarkets(params) {
  return request(`${NODE_API}/student/gdpst/queryFinancialMarkets`, {
    method: 'GET',
    params
  })
}
