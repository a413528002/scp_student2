import { request } from 'umi';

// 查询折旧管理数据
export async function queryBankDepreciations(params) {
  return request(`${NODE_API}/student/bd/queryBankDepreciations`, {
    method: 'GET',
    params,
  });
}

// 查询当前期间折旧管理数据
export async function queryCurBankDepreciations(params) {
  return request(`${NODE_API}/student/bd/queryCurBankDepreciations`, {
    method: 'GET',
    params,
  });
}

// 更新费用
export async function updateBankDepreciation(params) {
  return request(`${NODE_API}/student/bd/updateBankDepreciation`, {
    method: 'POST',
    data: params,
  });
}
