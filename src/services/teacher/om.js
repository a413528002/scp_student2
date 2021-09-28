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

// 查询各个银行营销费用
export async function queryBankMarketings(params) {
  return request(`${NODE_API}/teacher/om/queryBankMarketings`, {
    method: 'GET',
    params
  })
}

// 查询银行抢单记录
export async function queryBankGrabDetails(params) {
  return request(`${NODE_API}/teacher/om/queryBankGrabDetails`, {
    method: 'GET',
    params
  })
}

