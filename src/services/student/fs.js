import { request } from 'umi';

// 业务结账
export async function endBusiness(params) {
  return request(`${NODE_API}/student/fs/endBusiness`, {
    method: 'POST',
    data: params,
  });
}

// 财务结账
export async function endFinance(params) {
  return request(`${NODE_API}/student/fs/endFinance`, {
    method: 'POST',
    data: params,
  });
}

// 提交报表
export async function submitStatements(params) {
  return request(`${NODE_API}/student/fs/submitStatements`, {
    method: 'POST',
    data: params,
  });
}

// 查询银行期间信息
export async function queryBankPeriodInfo(params) {
  return request(`${NODE_API}/student/fs/queryBankPeriodInfo`, {
    method: 'GET',
    params,
  });
}

// 查询课堂报表列表
export async function queryClassReports(params) {
  return request(`${NODE_API}/student/fs/queryClassReports`, {
    method: 'GET',
    params,
  });
}

// 查询银行报表
export async function queryBankReport(params) {
  return request(`${NODE_API}/student/fs/queryBankReport`, {
    method: 'GET',
    params,
  });
}

// 保存报表
export async function saveBankReport(params) {
  return request(`${NODE_API}/student/fs/saveBankReport`, {
    method: 'POST',
    data: params,
  });
}
