import { request } from 'umi';

// 查询当前期间不良资产
export async function queryCurBankBadAssets(params) {
  return request(`${NODE_API}/student/bba/queryCurBankBadAssets`, {
    method: 'GET',
    params,
  });
}

// 查询不良资产
export async function queryBankBadAssets(params) {
  return request(`${NODE_API}/student/bba/queryBankBadAssets`, {
    method: 'GET',
    params,
  });
}

// 保存不良资产数据
export async function updateBankBadAssets(params) {
  return request(`${NODE_API}/student/bba/updateBankBadAssets`, {
    method: 'POST',
    data: params,
  });
}
