// 查询银行渠道
import { request } from 'umi';

export async function getStudentQueryBankChannels(params) {
  return request(`${NODE_API}/student/bc/queryBankChannels`, {
    method: 'GET',
    params
  })
}

// 创建银行渠道
export async function getStudentCreateBankChannel(params) {
  return request(`${NODE_API}/student/bc/createBankChannel`, {
    method: 'POST',
    data: params
  })
}
