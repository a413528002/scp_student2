import { request } from 'umi';

// 贷款抢单
export async function grab(params) {
  return request(`${NODE_API}/student/gloan/grab`, {
    method: 'POST',
    data: params
  })
    .catch(function(error) {
      console.log(error);
    });
}


// 查询贷款抢单记录
export async function queryLogs(params) {
  return request(`${NODE_API}/student/gloan/queryLogs`, {
    method: 'GET',
    params
  })
}

// 查询金融市场
export async function queryFinancialMarkets(params) {
  return request(`${NODE_API}/student/gloan/queryFinancialMarkets`, {
    method: 'GET',
    params
  })
}
