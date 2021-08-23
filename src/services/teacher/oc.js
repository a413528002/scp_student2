import {request} from "umi";

// 查询课堂信息
export async function queryClassInfo(params) {
  return request(`${NODE_API}/teacher/oc/queryClassInfo`, {
    method: 'GET',
    params: {classHourId: params.classHourId}
  })
}

// 开始经营
export async function startPeriod(params) {
  return request(`${NODE_API}/teacher/oc/startPeriod`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 结束经营
export async function endPeriod(params) {
  return request(`${NODE_API}/teacher/oc/endPeriod`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 转入下期
export async function nextPeriod(params) {
  return request(`${NODE_API}/teacher/oc/nextPeriod`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 开始存款抢单
export async function startGrabDeposit(params) {
  return request(`${NODE_API}/teacher/oc/startGrabDeposit`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 结束存款抢单
export async function endGrabDeposit(params) {
  return request(`${NODE_API}/teacher/oc/endGrabDeposit`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 开始贷款抢单
export async function startGrabLoan(params) {
  return request(`${NODE_API}/teacher/oc/startGrabLoan`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}

// 结束贷款抢单
export async function endGrabLoan(params) {
  return request(`${NODE_API}/teacher/oc/endGrabLoan`, {
    method: 'POST',
    data: {classHourId: params.classHourId}
  })
}


