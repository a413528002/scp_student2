import { request } from 'umi';

// 查询薪资/费用
export async function queryBankRiskRegulation(params) {
  return request(`${NODE_API}/student/rr/queryBankRiskRegulation`, {
    method: 'GET',
    params,
  });
}

// 更新费用
export async function updateBankRiskRegulation(params) {
  return request(`${NODE_API}/student/rr/updateBankRiskRegulation`, {
    method: 'POST',
    data: params,
  });
}
