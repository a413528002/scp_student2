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
      title: '破产期数',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '破产类型',
      dataIndex: 'typeName',
      key: 'typeName',
    },
    {
      title: '破产缺口金额',
      dataIndex: 'gapAmount',
      key: 'gapAmount',
      render: (gapAmount) => <Million>{gapAmount}</Million>,
    },
    {
      title: '申请注资期间',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '注入资金(万元)',
      dataIndex: 'injectAmount',
      key: 'injectAmount',
      render: (injectAmount) => <Million>{injectAmount}</Million>,
    },
    {
      title: '状态',
      dataIndex: 'statusName',
      key: 'statusName',
      /* render: (statusName) => {
        switch (statusName) {
          case 'INIT':
            return '未处理';
          case 'PENDING':
            return '申请中';
          case 'PASS':
            return '通过';
          default:
            break;
        }
      }, */
    },
    {
      title: '操作',
      dataIndex: 'value1',
      key: 'value1',
      render: (_, { bankInjectMoneyId, status }) =>
        status === 'PENDING' ? (
          <Popconfirm
            title="确认同意"
            onConfirm={() => agreedToInject(bankInjectMoneyId)}
            onCancel={handleCancelPop}
          >
            <Button type="primary" size="small">
              同意
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <Card title="破产管理" bordered={false} type="inner">
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
    </Card>
  );
};

export default connect(({ teacherBankruptcy, loading }) => ({
  dataSource: teacherBankruptcy.queryBankInjectMoniesData,
  loading: loading.effects['teacherBankruptcy/queryBankInjectMonies'],
}))(BankruptcyTable);
