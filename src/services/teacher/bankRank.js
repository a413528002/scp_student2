import { request } from 'umi';

// 银行排名 查询课堂信息
export async function queryBankRanks(params) {
  return request(`${NODE_API}/common/bsr/queryBankRanks`, {
    method: 'GET',
    params,
  });
}
