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
