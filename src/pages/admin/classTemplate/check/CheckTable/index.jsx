import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, message, Popconfirm, Select, Space } from 'antd';
import PublicTable from '@/components/Table';
import { findEnums } from '@/utils/commonUtils';
import styles from '@/pages/admin/classTemplate/variable/index.less';
import CheckFormDrawer from '@/pages/admin/classTemplate/check/CheckFormDrawer';

const CheckTable = (props) => {
  const {
    querySelectData,
    dataSource,
    classTemplateId,
    queryEnumsData: { CheckType },
  } = props;
  const { dispatch, loading, deleteLoading } = props;
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
   * 删除课堂模板-账务检查
   * @param classTemplateManualBookCheckId
   */
  const deleteClassTemplateManualBookCheck = (classTemplateManualBookCheckId) => {
    if (classTemplateManualBookCheckId) {
      dispatch({
        type: 'adminCheck/deleteClassTemplateManualBookCheck',
        payload: { classTemplateManualBookCheckId },
      });
    }
  };

  // Drawer状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  // Drawer内容
  const [typeDrawer, setTypeDrawer] = useState({});

  /**
   * 显示modal
   * @param type 操作类型 CREATE:新增 UPDATE:修改
   * @param _record
   */
  const handleShowDrawer = (type, _record) => {
    if (type === 'CREATE') {
      setTypeDrawer({ type, title: '新建' });
    } else if (type === 'UPDATE') {
      const record = {
        ..._record,
      };
      setTypeDrawer({ type, title: '修改', record });
    }
    setDrawerVisible(true);
  };

  // 关闭Drawer
  const handleCancelDrawer = () => {
    setDrawerVisible(false);
  };

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

  // 取消Pop
  const handleCancelPop = () => {
    message.error('已取消');
  };

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
    {
      title: '操作',
      key: 'opt',
      fixed: 'right',
      align: 'center',
      render: (_, record) => {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => {
                handleShowDrawer('UPDATE', record);
              }}
            >
              修改
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => deleteClassTemplateManualBookCheck(record.id)}
              onCancel={handleCancelPop}
            >
              <Button type="primary" size="small" loading={deleteLoading}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.choose}>
        {/* 选择框 */}
        <Select value={classTemplateId} onChange={handleChangeSelectOption} style={{ width: 120 }}>
          {selectOption}
        </Select>
        <Button
          type="primary"
          onClick={() => {
            handleShowDrawer('CREATE');
          }}
        >
          新建
        </Button>
      </div>
      {/* table */}
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
        scroll={{ x: 1900 }}
      />
      {drawerVisible && (
        <CheckFormDrawer
          drawerVisible={drawerVisible}
          handleCancelDrawer={handleCancelDrawer}
          typeDrawer={typeDrawer}
        />
      )}
    </>
  );
};

export default connect(({ adminCheck, loading }) => ({
  querySelectData: adminCheck.queryClassTemplatesData,
  dataSource: adminCheck.queryClassTemplateManualBookChecksData,
  classTemplateId: adminCheck.classTemplateId,
  queryEnumsData: adminCheck.queryEnumsData,
  loading: loading.effects['adminCheck/queryClassTemplateManualBookChecks'],
  deleteLoading: loading.effects['adminCheck/deleteClassTemplateManualBookCheck'],
}))(CheckTable);
