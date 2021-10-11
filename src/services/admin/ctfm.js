import { request } from 'umi';

// 查询课堂模板-科目
export async function queryClassTemplateFinancialMarkets(params) {
  return request(`${NODE_API}/admin/ctfm/queryClassTemplateFinancialMarkets`, {
    method: 'GET',
    params,
  });
}

// 查询课堂模板
export async function queryFMClassTemplates(params) {
  return request(`${NODE_API}/admin/ctfm/queryClassTemplates`, {
    method: 'GET',
    params,
  });
}

// 查询枚举
export async function queryEnums(params) {
  return request(`${NODE_API}/admin/ctfm/queryEnums`, {
    method: 'GET',
    params,
  });
}

// 新建课堂模板-金融数据
export async function createClassTemplateFinancialMarket(params) {
  return request(`${NODE_API}/admin/ctfm/createClassTemplateFinancialMarket`, {
    method: 'POST',
    data: params,
  });
}

// 删除课堂模板-金融数据
export async function deleteClassTemplateFinancialMarket(params) {
  return request(`${NODE_API}/admin/ctfm/deleteClassTemplateFinancialMarket`, {
    method: 'POST',
    data: params,
  });
}

// 修改课堂模板-金融数据
export async function updateClassTemplateFinancialMarket(params) {
  return request(`${NODE_API}/admin/ctfm/updateClassTemplateFinancialMarket`, {
    method: 'POST',
    data: params,
  });
}
