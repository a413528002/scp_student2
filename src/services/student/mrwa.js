import { request } from 'umi';

// 查询列表
export async function queryBankRwaMarkets(params) {
  return request(`${NODE_API}/student/mrwa/queryBankRwaMarkets`, {
    method: 'GET',
    params,
  });
}

// 保存市场风险
export async function updateBankRwaMarket(params) {
  return request(`${NODE_API}/student/mrwa/updateBankRwaMarket`, {
    method: 'POST',
    data: params,
  });
}
