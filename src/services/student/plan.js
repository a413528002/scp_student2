import {request} from "umi";

// 查询银行战略规划
export async function getStudentQueryBankPlan(params) {
  return request(`${NODE_API}/student/bp/queryBankPlan`, {
    method: 'GET',
    params
  })
}

// ---渠道建设START----
// 查询银行渠道
export async function getStudentQueryBankChannels(params) {
  return request(`${NODE_API}/student/bc/queryBankChannels`, {
    method: 'GET',
    params
  })
}

// 创建银行渠道
export async function getStudentCreateBankChannel(params) {
  return request(`${NODE_API}/student/bc/createBankChannel`, {
    method: 'POST',
    data: params
  })
}

// ---渠道建设END----

// ---营销管理（精准营销）START----
// 根据银行ID查询当前期间银行营销信息
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
// ---营销管理（精准营销）END----
