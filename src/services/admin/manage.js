import { request } from 'umi';

// 查询课堂模板
export async function queryClassTemplates(params) {
  return request(`${NODE_API}/admin/classTemplate/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板
export async function createClassTemplate(params) {
  return request(`${NODE_API}/admin/classTemplate/create`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板
export async function updateClassTemplate(params) {
  return request(`${NODE_API}/admin/classTemplate/update`, {
    method: 'POST',
    data: params,
  });
}
