import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button, Card, message, Popconfirm } from 'antd';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';

const BankruptcyTable = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      // 查询注资列表
      dispatch({
        type: 'teacherBankruptcy/queryBankInjectMonies',
        payload: { classHourId },
      });
    }
  }, []);
  // 同意注资
  const agreedToInject = (bankInjectMoneyId) => {
    if (classHourId && bankInjectMoneyId) {
      dispatch({
        type: 'teacherBankruptcy/agreedToInject',
        payload: { classHourId, bankInjectMoneyId },
      });
    }
  };
  // 关闭pop
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '注入资金(万元)',
      dataIndex: 'injectAmount',
      key: 'injectAmount',
      render: (injectAmount) => <Million>{injectAmount}</Million>,
    },
    {
      title: '操作',
      dataIndex: 'value1',
      key: 'value1',
      render: (_, { bankInjectMoneyId }) => (
        <Popconfirm
          title="确认同意"
          onConfirm={() => agreedToInject(bankInjectMoneyId)}
          onCancel={handleCancelPop}
        >
          <Button type="primary" size="small">
            同意
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Card title="破产管理" bordered={false} type="inner">
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
      />
    </Card>
  );
};

export default connect(({ teacherBankruptcy, loading }) => ({
  dataSource: teacherBankruptcy.queryBankInjectMoniesData,
  loading: loading.effects['teacherBankruptcy/queryBankInjectMonies'],
}))(BankruptcyTable);
