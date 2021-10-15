import React, {useEffect, useState} from 'react';
import { connect } from 'umi';
import { Button, message, Popconfirm, Select, Space } from 'antd';
import PublicTable from '@/components/Table';
import styles from '@/pages/admin/classTemplate/variable/index.less';
import { findEnums } from '@/utils/commonUtils';
import VariableFormDrawer from "@/pages/admin/classTemplate/variable/VariableFormDrawer";

const VariableTable = (props) => {
  const {
    querySelectData,
    classTemplateId,
    dataSource,
    queryEnumsData: { ClassVariables },
  } = props;
  const { dispatch, loading, deleteLoading } = props;

  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminVariable/queryClassTemplates',
    });
  }, []);

  // 查询枚举
  useEffect(() => {
    dispatch({
      type: 'adminVariable/queryEnums',
    });
  }, []);

  /**
   * 删除课堂模板-变量
   * @param classTemplateVariableId
   */
  const deleteClassTemplateVariable = (classTemplateVariableId) => {
    if (classTemplateVariableId) {
      dispatch({
        type: 'adminVariable/deleteClassTemplateVariable',
        payload: { classTemplateVariableId },
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
      type: 'adminVariable/queryClassTemplateVariables',
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
      title: '变量KEY',
      dataIndex: 'varKey',
      key: 'varKey',
      width: '20%',
      filters: ClassVariables,
      onFilter: (value, { varKey }) => varKey.indexOf(value) === 0,
      render: (value) => findEnums(ClassVariables, value),
    },
    {
      title: '变量VALUE',
      dataIndex: 'varValue',
      key: 'varValue',
    },
    {
      title: '操作',
      key: 'opt',
      width: '10%',
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
              onConfirm={() => deleteClassTemplateVariable(record.id)}
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
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />

      {/* modal */}
       {drawerVisible && (
        <VariableFormDrawer
          drawerVisible={drawerVisible}
          typeDrawer={typeDrawer}
          handleCancelDrawer={handleCancelDrawer}
        />
      )}
    </>
  );
};

export default connect(({ adminVariable, loading }) => ({
  querySelectData: adminVariable.queryClassTemplatesData,
  dataSource: adminVariable.queryClassTemplateVariablesData,
  classTemplateId: adminVariable.classTemplateId,
  queryEnumsData: adminVariable.queryEnumsData,
  loading: loading.effects['adminVariable/queryClassTemplateVariables'],
  deleteLoading: loading.effects['adminVariable/deleteClassTemplateVariable'],
}))(VariableTable);
