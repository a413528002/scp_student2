import {request} from "umi";

// 创建课堂
export async function getTeacherCreateClassHour(params) {
  return request(`${NODE_API}/teacher/ch/createClassHour`, {
    method: 'POST',
    data: params
  })
}

// 查询我管理的课堂
export async function getTeacherQueryMyClassHours(params) {
  return request(`${NODE_API}/teacher/ch/queryMyClassHours`, {
    method: 'GET',
    // params
  })
}

// 开始课堂
export async function getTeacherStartClassHour(params) {
  return request(`${NODE_API}/teacher/ch/startClassHour`, {
    method: 'POST',
    data: params
  })
}

// 结束课堂
export async function getTeacherEndClassHour(params) {
  return request(`${NODE_API}/teacher/ch/endClassHour`, {
    method: 'POST',
    data: params
  })
}

// 查询课堂成员
export async function getTeacherQueryClassHourUsers(params) {
  return request(`${NODE_API}/teacher/ch/queryClassHourUsers`, {
    method: 'GET',
    params
  })
}

// 踢出课堂成员
export async function getTeacherKickClassHourUser(params) {
  return request(`${NODE_API}/teacher/ch/kickClassHourUser`, {
    method: 'POST',
    data: params
  })
}

