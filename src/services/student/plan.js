import {request} from "umi";

// 根据课堂编码查询课堂
/*export async function getStudentQueryClassHourByCode(params) {
  return request(`${NODE_API}/student/ch/queryClassHourByCode`, {
    method: 'GET',
    params
  })
}*/

// 查询银行战略规划
export async function getStudentQueryBankPlan(params) {
  return request(`${NODE_API}/student/bp/queryBankPlan`, {
    method: 'get',
    params
  })
}
