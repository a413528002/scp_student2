import { request } from 'umi';

// 查询注资列表
export async function queryBankInjectMonies(params) {
  return request(`${NODE_API}/teacher/bb/queryBankInjectMonies`, {
    method: 'GET',
    params,
  });
}

// 同意注资
export async function agreedToInject(params) {
  return request(`${NODE_API}/teacher/bb/agreedToInject`, {
    method: 'POST',
    data: params,
  });
}
