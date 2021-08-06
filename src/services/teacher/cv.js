import {request} from "umi";

// 查詢课堂变量
export async function queryClassVariables(param) {
  return request(`${NODE_API}/teacher/cv/queryClassVariables`, {
    method: 'GET',
    params: {classHourId: param.classHourId}
  })
}

// 修改课堂变量
export async function updateClassVariable(param) {
  return request(`${NODE_API}/teacher/cv/updateClassVariable`, {
    method: 'POST',
    data: {
      classHourId: param.classHourId,
      varKey: param.varKey,
      varValue: param.varValue
    }
  })
}
