import {request} from "umi";

// 债券抢单
export async function grab(params) {
  return request(`${NODE_API}/student/gdebt/grab`, {
    method: 'POST',
    data:params
  })
}

// 查询债券抢单记录
export async function gdebtQueryLogs(params) {
  return request(`${NODE_API}/student/gdebt/queryLogs`, {
    method: 'GET',
    params
  })
}
