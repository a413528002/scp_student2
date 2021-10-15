import { request } from 'umi';

// 查询课堂模板-账务检查
export async function queryClassTemplateManualBookChecks(params) {
  return request(`${NODE_API}/admin/ctmbc/queryClassTemplateManualBookChecks`, {
    method: 'GET',
    params,
  });
}

// 查询课堂模板
export async function queryClassTemplates(params) {
  return request(`${NODE_API}/admin/ctmbc/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 查询枚举
export async function queryEnums(params) {
  return request(`${NODE_API}/admin/ctmbc/queryEnums`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板-账务检查
export async function createClassTemplateManualBookCheck(params) {
  return request(`${NODE_API}/admin/ctmbc/createClassTemplateManualBookCheck`, {
    method: 'POST',
    data: params,
  });
}

// 删除课堂模板-账务检查
export async function deleteClassTemplateManualBookCheck(params) {
  return request(`${NODE_API}/admin/ctmbc/deleteClassTemplateManualBookCheck`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板-账务检查
export async function updateClassTemplateManualBookCheck(params) {
  return request(`${NODE_API}/admin/ctmbc/updateClassTemplateManualBookCheck`, {
    method: 'POST',
    data: params,
  });
}
