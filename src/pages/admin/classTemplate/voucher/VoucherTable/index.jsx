import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, message, Popconfirm, Select, Space } from 'antd';
import PublicTable from '@/components/Table';
import { findEnums } from '@/utils/commonUtils';
import VoucherFormDrawer from '@/pages/admin/classTemplate/voucher/VoucherFormDrawer';
import styles from '@/pages/admin/classTemplate/financial/index.less';

const VoucherTable = (props) => {
  const { dispatch, loading, deleteLoading } = props;
  const {
    querySelectData,
    dataSource,
    classTemplateId,
    queryEnumsData: { Direction, TransCode },
  } = props;
  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminVoucher/queryVClassTemplates',
    });
  }, []);

  // 查询枚举
  useEffect(() => {
    dispatch({
      type: 'adminVoucher/queryEnums',
    });
  }, []);

  /**
   * 删除课堂模板-凭证引擎配置
   * @param classTemplateVoucherId id
   */
  const deleteClassTemplateVoucher = (classTemplateVoucherId) => {
    if (classTemplateVoucherId) {
      dispatch({
        type: 'adminVoucher/deleteClassTemplateVoucher',
        payload: { classTemplateVoucherId },
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
      type: 'adminVoucher/queryClassTemplateVoucher',
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
      title: '序号',
      dataIndex: 'transCode',
      key: 'transCode',
      filters: TransCode,
      onFilter: (value, { transCode }) => transCode.indexOf(value) === 0,
      render: (value) => findEnums(TransCode, value),
    },
    {
      title: '科目号',
      dataIndex: 'subjectNo',
      key: 'subjectNo',
    },
    {
      title: '记账方向',
      dataIndex: 'recDir',
      key: 'recDir',
      filters: Direction,
      onFilter: (value, { recDir }) => recDir.indexOf(value) === 0,
      render: (value) => findEnums(Direction, value),
    },
    {
      title: '记账金额EL表达式',
      dataIndex: 'elRecAmount',
      key: 'elRecAmount',
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
              onConfirm={() => deleteClassTemplateVoucher(record.id)}
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
        <VoucherFormDrawer
          drawerVisible={drawerVisible}
          typeDrawer={typeDrawer}
          handleCancelDrawer={handleCancelDrawer}
        />
      )}
    </>
  );
};

export default connect(({ adminVoucher, loading }) => ({
  querySelectData: adminVoucher.queryVClassTemplatesData,
  dataSource: adminVoucher.queryClassTemplateVoucherData,
  classTemplateId: adminVoucher.classTemplateId,
  queryEnumsData: adminVoucher.queryEnumsData,
  loading: loading.effects['adminVoucher/queryClassTemplateVoucher'],
  deleteLoading: loading.effects['adminVoucher/deleteClassTemplateVoucher'],
}))(VoucherTable);
