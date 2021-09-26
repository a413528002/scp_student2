import { request } from 'umi';

// 查询原始凭证
export async function queryBankOriginalCertificates(params) {
  return request(`${NODE_API}/student/bv/queryBankOriginalCertificates`, {
    method: 'GET',
    params,
  });
}
