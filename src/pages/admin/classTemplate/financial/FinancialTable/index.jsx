import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, message, Space, Select, Popconfirm } from 'antd';
import PublicTable from '@/components/Table';
import styles from '@/pages/admin/classTemplate/financial/index.less';
import BizType from '@/components/BizType';
import Million from '@/components/Million';
import { findEnums, toPercent } from '@/utils/commonUtils';
import FinancialFormDrawer from '@/pages/admin/classTemplate/financial/FinancialFormDrawer';

const FinancialTable = (props) => {
  const { dispatch, deleteLoading, loading } = props;
  const {
    querySelectData,
    classTemplateId,
    dataSource,
    queryEnumsData: {
      BusinessType,
      RateType,
      CustomerType,
      LoanType,
      CreditRating,
      DebtType,
      Channel,
      Region,
    },
  } = props;

  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminFinancial/queryFMClassTemplates',
    });
  }, []);

  // 查询枚举
  useEffect(() => {
    dispatch({
      type: 'adminFinancial/queryEnums',
    });
  }, []);

  /**
   * 删除课堂模板-金融数据
   * @param classTemplateFinancialMarketId id
   */
  const deleteClassTemplateFinancialMarket = (classTemplateFinancialMarketId) => {
    if (classTemplateFinancialMarketId) {
      dispatch({
        type: 'adminFinancial/deleteClassTemplateFinancialMarket',
        payload: { classTemplateFinancialMarketId },
      });
    }
  };

  // Drawer状态
  const [drawerVisible, setDrawerVisible] = useState(false);
  // modal内容
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

  // 关闭modal
  const handleCancelDrawer = () => {
    setDrawerVisible(false);
  };

  /**
   * 下拉框切换
   * @param classTemplateId 课堂模板id
   */
  const handleChangeSelectOption = (classTemplateId) => {
    dispatch({
      type: 'adminFinancial/queryClassTemplateFinancialMarkets',
      payload: { classTemplateId },
    });
  };

  /**
   * selectOption OPTIONS
   */
  const selectOption = querySelectData.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.name}
    </Select.Option>
  ));
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'bizType',
      key: 'bizType',
      filters: BusinessType,
      onFilter: (value, { bizType }) => bizType.indexOf(value) === 0,
      render: (value) => findEnums(BusinessType, value),
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '期限',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '利率类型',
      dataIndex: 'rateType',
      key: 'rateType',
      filters: RateType,
      onFilter: (value, { rateType }) => rateType.indexOf(value) === 0,
      render: (value) => findEnums(RateType, value),
    },
    {
      title: '期望利率',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => toPercent(expectRate),
    },
    {
      title: '存贷客户类型',
      dataIndex: 'customerType',
      key: 'customerType',
      filters: CustomerType,
      onFilter: (value, { customerType }) => customerType.indexOf(value) === 0,
      render: (value) => findEnums(CustomerType, value),
    },
    {
      title: '贷款分类',
      dataIndex: 'loanType',
      key: 'loanType',
      filters: LoanType,
      onFilter: (value, { loanType }) => loanType.indexOf(value) === 0,
      render: (value) => findEnums(LoanType, value),
    },
    {
      title: '质押或担保金额(万元)',
      dataIndex: 'mgMoney',
      key: 'mgMoney',
      render: (mgMoney) => <Million>{mgMoney}</Million>,
    },
    {
      title: '贷款信用评级',
      dataIndex: 'creditRating',
      key: 'creditRating',
      filters: CreditRating,
      onFilter: (value, { creditRating }) => creditRating.indexOf(value) === 0,
      render: (value) => findEnums(CreditRating, value),
    },
    {
      title: '债券分类',
      dataIndex: 'debtType',
      key: 'debtType',
      filters: DebtType,
      onFilter: (value, { debtType }) => debtType.indexOf(value) === 0,
      render: (value) => findEnums(DebtType, value),
    },
    {
      title: '渠道代码',
      dataIndex: 'channel',
      key: 'channel',
      filters: Channel,
      onFilter: (value, { channel }) => channel.indexOf(value) === 0,
      render: (value) => findEnums(Channel, value),
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
      filters: Region,
      onFilter: (value, { region }) => region.indexOf(value) === 0,
      render: (value) => findEnums(Region, value),
    },
    {
      title: '操作',
      key: 'opt',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => handleShowDrawer('UPDATE', record)}>
              修改
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => deleteClassTemplateFinancialMarket(record.id)}
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
        <Button type="primary" onClick={() => handleShowDrawer('CREATE')}>
          新建
        </Button>
      </div>
      {/* table */}
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      {/* modal */}
      {drawerVisible && (
        <FinancialFormDrawer
          drawerVisible={drawerVisible}
          typeDrawer={typeDrawer}
          handleCancelDrawer={handleCancelDrawer}
        />
      )}
    </>
  );
};

export default connect(({ adminFinancial, loading }) => ({
  querySelectData: adminFinancial.queryFMClassTemplatesData,
  classTemplateId: adminFinancial.classTemplateId,
  dataSource: adminFinancial.queryClassTemplatesData,
  queryEnumsData: adminFinancial.queryEnumsData,
  loading: loading.effects['adminFinancial/queryClassTemplateFinancialMarkets'],
  deleteLoading: loading.effects['adminFinancial/deleteClassTemplateFinancialMarket'],
}))(FinancialTable);
