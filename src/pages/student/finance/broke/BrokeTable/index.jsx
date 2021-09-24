import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Card, Popconfirm, message } from 'antd';
import BrokeRule from '@/pages/student/finance/broke/BrokeRule';
import Million from '@/components/Million';

const BrokeTable = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      // 查询列表
      dispatch({
        type: 'studentBroke/queryBankInjectMonies',
        payload: { classHourId },
      });
    }
  }, []);
  /**
   * 注资申请
   * @param bankInjectMoneyId 银行注资数据ID
   */
  const applyForInject = (bankInjectMoneyId) => {
    if (classHourId && bankInjectMoneyId) {
      dispatch({
        type: 'studentBroke/applyForInject',
        payload: { classHourId, bankInjectMoneyId },
      });
    }
  };

  // 取消编辑pop
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
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
        status === 'INIT' ? (
          <Popconfirm
            title="确认申请"
            onConfirm={() => applyForInject(bankInjectMoneyId)}
            onCancel={handleCancelPop}
          >
            <Button type="primary" size="small">
              注资申请
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <Card title="破产管理" bordered={false} type="inner">
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      <BrokeRule />
    </Card>
  );
};

export default connect(({ studentBroke, loading }) => ({
  dataSource: studentBroke.queryBankruptciesData,
  loading: loading.effects['studentBroke/queryBankInjectMonies'],
}))(BrokeTable);
