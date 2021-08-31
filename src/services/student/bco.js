import { request } from 'umi';

// 查询第三方质询
export async function queryBankConsultations(params) {
  return request(`${NODE_API}/student/bco/queryBankConsultations`, {
    method: 'GET',
    params
  })
}

// 购买第三方质询
export async function buyBankConsultation(params) {
  return request(`${NODE_API}/student/bco/buyBankConsultation`, {
    method: 'POST',
    data: params
  })
}
