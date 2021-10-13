import { request } from 'umi';

// 查询课堂模板-科目
export async function queryClassTemplateAccountingSubjects(params) {
  return request(`${NODE_API}/admin/ctas/queryClassTemplateAccountingSubjects`, {
    method: 'GET',
    params,
  });
}

// 查询课堂模板
export async function queryClassTemplates(params) {
  return request(`${NODE_API}/admin/ctas/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 查询枚举
export async function queryEnums(params) {
  return request(`${NODE_API}/admin/ctas/queryEnums`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板-科目
export async function createClassTemplateAccountingSubject(params) {
  return request(`${NODE_API}/admin/ctas/createClassTemplateAccountingSubject`, {
    method: 'POST',
    data: params,
  });
}

// 删除课堂模板-科目
export async function deleteClassTemplateAccountingSubject(params) {
  return request(`${NODE_API}/admin/ctas/deleteClassTemplateAccountingSubject`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板-科目
export async function updateClassTemplateAccountingSubject(params) {
  return request(`${NODE_API}/admin/ctas/updateClassTemplateAccountingSubject`, {
    method: 'POST',
    data: params,
  });
}
