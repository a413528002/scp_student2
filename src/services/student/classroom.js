import {request} from "umi";

// 根据课堂编码查询课堂
export async function getStudentQueryClassHourByCode(params) {
  return request(`${NODE_API}/student/ch/queryClassHourByCode`, {
    method: 'GET',
    params
  })
}

// 加入课堂
export async function getStudentJoinClassHour(params) {
  return request(`${NODE_API}/student/ch/joinClassHour`, {
    method: 'POST',
    data: params
  })
}

// 退出课堂
export async function getStudentExitClassHour(params) {
  return request(`${NODE_API}/student/ch/exitClassHour`, {
    method: 'POST',
    data: params
  })
}
// 查询已加入课堂
export async function getStudentQueryJoinedClassHours(params) {
  return request(`${NODE_API}/student/ch/queryJoinedClassHours`, {
    method: 'GET',
    params
  })
}
// 创建银行
export async function getStudentCreateBank(params) {
  return request(`${NODE_API}/student/ch/createBank`, {
    method: 'POST',
    data: params
  })
}

// 退出银行
export async function getStudentExitBank(params) {
  return request(`${NODE_API}/student/ch/exitBank`, {
    method: 'POST',
    data: params
  })
}
