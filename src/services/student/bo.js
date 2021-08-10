import {request} from "umi";

// 创建银行机构
export async function createBankOrganization(params) {
  return request(`${NODE_API}/student/bo/createBankOrganization`, {
    method: 'POST',
    data: params
  })
}

// 查询银行机构
export async function queryBankOrganizations(params) {
  return request(`${NODE_API}/student/bo/queryBankOrganizations`, {
    method: 'GET',
    params
  })
}
