import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Select } from 'antd';
import PublicTable from '@/components/Table';
import { findEnums } from '@/utils/commonUtils';
import styles from '@/pages/admin/classTemplate/variable/index.less';

const CheckTable = (props) => {
  const {
    querySelectData,
    dataSource,
    classTemplateId,
    queryEnumsData: { CheckType },
  } = props;
  const { dispatch, loading } = props;
  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminCheck/queryClassTemplates',
    });
  }, []);

  // 查询枚举
  useEffect(() => {
    dispatch({
      type: 'adminCheck/queryEnums',
    });
  }, []);

  /**
   * 下拉框切换
   * @param classTemplateId 课堂模板id
   */
  const handleChangeSelectOption = (classTemplateId) => {
    dispatch({
      type: 'adminCheck/queryClassTemplateManualBookChecks',
      payload: { classTemplateId },
    });
  };

  /**
   * selectOption OPTIONS
   */
  const selectOption = querySelectData?.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.name}
    </Select.Option>
  ));

  const columns = [
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      filters: CheckType,
      onFilter: (value, { type }) => type.indexOf(value) === 0,
      render: (value) => findEnums(CheckType, value),
    },
    {
      title: '待检查实体Class',
      dataIndex: 'entityClass',
      key: 'entityClass',
    },
    {
      title: '待检查属性名',
      dataIndex: 'fieldName',
      key: 'fieldName',
    },
    {
      title: '待检查实体ID属性',
      dataIndex: 'fieldNameId',
      key: 'fieldNameId',
    },
    {
      title: '待检查实体交易码属性',
      dataIndex: 'fieldNameTransCode',
      key: 'fieldNameTransCode',
    },
    {
      title: '待检查实体交易号属性',
      dataIndex: 'fieldNameTransNo',
      key: 'fieldNameTransNo',
    },
    {
      title: '模块名称',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '提示咨询费用',
      dataIndex: 'hintCost',
      key: 'hintCost',
    },
    {
      title: '完整咨询费用',
      dataIndex: 'fullCost',
      key: 'fullCost',
    },
    {
      title: '错账扣分',
      dataIndex: 'errorPoint',
      key: 'errorPoint',
    },
    {
      title: '错误说明',
      dataIndex: 'comments',
      key: 'comments',
    },
  ];
  return (
    <>
      <div className={styles.choose}>
        {/* 选择框 */}
        <Select value={classTemplateId} onChange={handleChangeSelectOption} style={{ width: 120 }}>
          {selectOption}
        </Select>
      </div>
      {/* table */}
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered scroll={{x:1800}}/>
    </>
  );
};

export default connect(({ adminCheck, loading }) => ({
  querySelectData: adminCheck.queryClassTemplatesData,
  dataSource: adminCheck.queryClassTemplateManualBookChecksData,
  classTemplateId: adminCheck.classTemplateId,
  queryEnumsData: adminCheck.queryEnumsData,
  loading: loading.effects['adminCheck/queryClassTemplateManualBookChecks'],
}))(CheckTable);
