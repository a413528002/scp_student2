import { request } from 'umi';

// 查询课堂模板-变量
export async function queryClassTemplateVariables(params) {
  return request(`${NODE_API}/admin/ctvar/queryClassTemplateVariables`, {
    method: 'GET',
    params,
  });
}

// 查询课堂模板
export async function queryClassTemplates(params) {
  return request(`${NODE_API}/admin/ctvar/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 查询枚举
export async function queryEnums(params) {
  return request(`${NODE_API}/admin/ctvar/queryEnums`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板-变量
export async function createClassTemplateVariable(params) {
  return request(`${NODE_API}/admin/ctvar/createClassTemplateVariable`, {
    method: 'POST',
    data: params,
  });
}

// 删除课堂模板-变量
export async function deleteClassTemplateVariable(params) {
  return request(`${NODE_API}/admin/ctvar/deleteClassTemplateVariable`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板-变量
export async function updateClassTemplateVariable(params) {
  return request(`${NODE_API}/admin/ctvar/updateClassTemplateVariable`, {
    method: 'POST',
    data: params,
  });
}
