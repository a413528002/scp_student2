import { request } from 'umi';

// 银行排名 查询课堂信息
export async function getQiXinToken(params) {
  return request(`${NODE_API}/qixin/token`, {
    method: 'GET',
    params,
  });
}
