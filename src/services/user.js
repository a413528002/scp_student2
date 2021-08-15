import {request} from "umi";

export async function queryCurrentUser() {
  return request(`${NODE_API}/queryCurrentUser`, {
    method: 'GET',
  })
}
