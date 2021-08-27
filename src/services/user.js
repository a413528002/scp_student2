import { request } from 'umi';

// 查询用户的信息
export async function queryCurrentUser() {
  return request(`${NODE_API}/queryCurrentUser`, {
    method: 'GET',
  });
}

// 修改昵称
export async function changeNickname(params) {
  return request(`${NODE_API}/changeNickname`, {
    method: 'POST',
    data: params,
  });
}

// 修改密码
export async function changePassword(params) {
  return request(`${NODE_API}/changePassword`, {
    method: 'POST',
    data: params,
  });
}
