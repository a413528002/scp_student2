import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import styles from '@/pages/admin/classTemplate/financial/index.less';
import { Button, message, Popconfirm, Select, Space } from 'antd';
import PublicTable from '@/components/Table';
import { findEnums } from '@/utils/commonUtils';
import SubjectFormDrawer from '@/pages/admin/classTemplate/subject/SubjectFormDrawer';

const SubjectTable = (props) => {
  const { dispatch, loading, deleteLoading } = props;
  const {
    querySelectData,
    dataSource,
    classTemplateId,
    queryEnumsData: { AccountingSubjectType, AccountingSubjectTypeSub, Direction },
  } = props;

  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminSubject/queryClassTemplates',
    });
  }, []);

  // 查询枚举
  useEffect(() => {
    dispatch({
      type: 'adminSubject/queryEnums',
    });
  }, []);

  /**
   * 删除课堂模板-科目
   * @param classTemplateAccountingSubjectId id
   */
  const deleteClassTemplateAccountingSubject = (classTemplateAccountingSubjectId) => {
    if (classTemplateAccountingSubjectId) {
      dispatch({
        type: 'adminSubject/deleteClassTemplateAccountingSubject',
        payload: { classTemplateAccountingSubjectId },
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
        amount: _record.amount / 10000,
        mgMoney: _record.mgMoney / 10000,
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
      type: 'adminSubject/queryClassTemplateAccountingSubjects',
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
      title: '科目号',
      dataIndex: 'subjectNo',
      key: 'subjectNo',
    },
    {
      title: '父科目号',
      dataIndex: 'parentSubjectNo',
      key: 'parentSubjectNo',
    },
    {
      title: '科目名称',
      dataIndex: 'subjectName',
      key: 'subjectName',
    },
    {
      title: '科目类型',
      dataIndex: 'type',
      key: 'type',
      filters: AccountingSubjectType,
      onFilter: (value, { type }) => type.indexOf(value) === 0,
      render: (value) => findEnums(AccountingSubjectType, value),
    },
    {
      title: '科目类型细分',
      dataIndex: 'typeSub',
      key: 'typeSub',
      filters: AccountingSubjectTypeSub,
      onFilter: (value, { typeSub }) => typeSub.indexOf(value) === 0,
      render: (value) => findEnums(AccountingSubjectTypeSub, value),
    },
    {
      title: '余额方向',
      dataIndex: 'balDir',
      key: 'balDir',
      filters: Direction,
      onFilter: (value, { balDir }) => balDir.indexOf(value) === 0,
      render: (value) => findEnums(Direction, value),
    },
    {
      title: '是否现金',
      dataIndex: 'isCash',
      key: 'isCash',
      render: (isCash) => {
        switch (isCash) {
          case true:
            return '是';
          case false:
            return '否';
          default:
            break;
        }
      },
    },
    {
      title: '操作',
      key: 'opt',
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
              onConfirm={() => deleteClassTemplateAccountingSubject(record.id)}
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

      {/* Drawer */}
      {drawerVisible && (
        <SubjectFormDrawer
          drawerVisible={drawerVisible}
          typeDrawer={typeDrawer}
          handleCancelDrawer={handleCancelDrawer}
        />
      )}
    </>
  );
};

export default connect(({ adminSubject, loading }) => ({
  querySelectData: adminSubject.queryClassTemplatesData,
  dataSource: adminSubject.queryClassTemplateAccountingSubjectsData,
  classTemplateId: adminSubject.classTemplateId,
  queryEnumsData: adminSubject.queryEnumsData,
  loading: loading.effects['adminSubject/queryClassTemplateAccountingSubjectsData'],
  deleteLoading: loading.effects['adminSubject/deleteClassTemplateAccountingSubject'],
}))(SubjectTable);
