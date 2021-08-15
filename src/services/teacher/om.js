import {request} from "umi";

// 查询各个银行错误记录
export async function queryBankWrongs(params) {
  return request(`${NODE_API}/teacher/om/queryBankWrongs`, {
    method: 'GET',
    params
  })
}

// 查询各个银行期间信息
export async function queryBankPeriodInfos(params) {
  return request(`${NODE_API}/teacher/om/queryBankPeriodInfos`, {
    method: 'GET',
    params
  })
}

// 查询各个银行机构信息
export async function queryBankOrganizations(params) {
  return request(`${NODE_API}/teacher/om/queryBankOrganizations`, {
    method: 'GET',
    params
  })
}

