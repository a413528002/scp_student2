// 根据银行ID查询当前期间银行营销信息
import { request } from 'umi';

export async function getStudentQueryCurBankMarketing(params) {
  return request(`${NODE_API}/student/bm/queryCurBankMarketing`, {
    method: 'GET',
    params
  })
}

// 投入营销费用
export async function getStudentInputMarketingCost(params) {
  return request(`${NODE_API}/student/bm/inputMarketingCost`, {
    method: 'POST',
    data: params
  })
}

// 查询往期投入
export async function getStudentQueryBankMarketings(params) {
  return request(`${NODE_API}/student/bm/queryBankMarketings`, {
    method: 'GET',
    params
  })
}
