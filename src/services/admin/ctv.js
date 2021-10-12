import { request } from 'umi';

// 查询课堂模板-凭证引擎配置
export async function queryClassTemplateVoucher(params) {
  return request(`${NODE_API}/admin/ctv/queryClassTemplateVoucher`, {
    method: 'GET',
    params,
  });
}

// 查询课堂模板
export async function queryVClassTemplates(params) {
  return request(`${NODE_API}/admin/ctv/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 查询枚举
export async function queryEnums(params) {
  return request(`${NODE_API}/admin/ctv/queryEnums`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板-凭证引擎配置
export async function createClassTemplateVoucher(params) {
  return request(`${NODE_API}/admin/ctv/createClassTemplateVoucher`, {
    method: 'POST',
    data: params,
  });
}

// 删除课堂模板-凭证引擎配置
export async function deleteClassTemplateVoucher(params) {
  return request(`${NODE_API}/admin/ctv/deleteClassTemplateVoucher`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板-凭证引擎配置
export async function updateClassTemplateVoucher(params) {
  return request(`${NODE_API}/admin/ctv/updateClassTemplateVoucher`, {
    method: 'POST',
    data: params,
  });
}
