import React from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import CreditorsRule from '@/pages/student/financial/creditors/CreditorsRule';
import { Button, Popconfirm, message } from 'antd';
import { useSubscription } from 'react-stomp-hooks';
import { toPercent } from '@/utils/commonUtils';
import Million from '@/components/Million';

const CreditorsTabMarket = (props) => {
  const { dispatch, loading, grabLoading } = props;
  const { dataSource } = props;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  /**
   * 处理消息
   * @param message
   */
  const handleMsg = (message) => {
    const msgBody = JSON.parse(message.body);
    if (msgBody.msgType === 'FINMKT_GRAB_INFO') {
      dispatch({
        type: 'studentCreditors/setGrabInfo',
        payload: { ...msgBody.data },
      });
    } else if (msgBody.msgType === 'FINMKT_GRABBED') {
      dispatch({
        type: 'studentCreditors/setGrabbedData',
        payload: msgBody.data,
      });
    } else {
      console.log(`未处理的MESSAGE：${msgBody}`);
    }
  };

  /**
   * 监听websocket连接
   */
  useSubscription(`/app/clshr/${classHourId}/finMkt/debt`, handleMsg);

  /**
   * 债券抢单
   * @param classFinancialMarketId id
   */
  const grab = (classFinancialMarketId) => {
    if (classHourId && classFinancialMarketId) {
      dispatch({
        type: 'studentCreditors/grab',
        payload: { classHourId, classFinancialMarketId },
      });
    }
  };

  // 关闭Pop
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
      key: 'customerTypeName',
    },
    {
      title: '区域',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },

    {
      title: '预计收益率',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => toPercent(expectRate),
    },
    {
      title: '期限',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '抢单',
      dataIndex: 'grab',
      key: 'grab',
      render: (_, { status, classFinancialMarketId }) => {
        return (
          <Popconfirm
            title="确认抢单?"
            onConfirm={() => grab(classFinancialMarketId)}
            onCancel={handleCancelPop}
            disabled={status !== 'NORMAL'}
          >
            <Button
              type="primary"
              size="small"
              loading={grabLoading}
              disabled={status !== 'NORMAL'}
            >
              抢单
            </Button>
          </Popconfirm>
        );
      },
    },
  ];
  return (
    <>
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      <CreditorsRule />
    </>
  );
};

export default connect(({ studentCreditors, loading }) => ({
  dataSource: studentCreditors.creditorsMarketData,
  loading: loading.models.studentCreditors,
}))(CreditorsTabMarket);
