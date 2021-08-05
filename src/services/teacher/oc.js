import {request} from "umi";

// 查询课堂信息
export async function queryClassInfo(classHourId) {
  return request(`${NODE_API}/teacher/oc/queryClassInfo`, {
    method: 'GET',
    params: {classHourId}
  })
}

// 开始经营
export async function startPeriod(classHourId) {
  return request(`${NODE_API}/teacher/oc/startPeriod`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 结束经营
export async function endPeriod(classHourId) {
  return request(`${NODE_API}/teacher/oc/endPeriod`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 转入下期
export async function nextPeriod(classHourId) {
  return request(`${NODE_API}/teacher/oc/nextPeriod`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 开始存款抢单
export async function startGrabDeposit(classHourId) {
  return request(`${NODE_API}/teacher/oc/startGrabDeposit`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 结束存款抢单
export async function endGrabDeposit(classHourId) {
  return request(`${NODE_API}/teacher/oc/endGrabDeposit`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 开始贷款抢单
export async function startGrabLoan(classHourId) {
  return request(`${NODE_API}/teacher/oc/startGrabDeposit`, {
    method: 'POST',
    data: {classHourId}
  })
}

// 结束贷款抢单
export async function endGrabLoan(classHourId) {
  return request(`${NODE_API}/teacher/oc/endGrabLoan`, {
    method: 'POST',
    data: {classHourId}
  })
}


