import React, {useEffect, useState} from 'react';
import { connect, useModel } from 'umi';
import PublicTable from '@/components/Table';
import CreditorsRule from '@/pages/student/financial/creditors/CreditorsRule';
import {Button, Card, Modal} from 'antd';
import { useSubscription } from 'react-stomp-hooks';
import { toPercent } from '@/utils/commonUtils';
import styles from '@/pages/student/deal/deposit/index.less';

const CreditorsTabMarket = (props) => {
  const { dispatch, loading, grabLoading } = props;
  const { dataSource = [], grabStatus, startDuration } = props;

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  const [makeUpCostConfirmModelVisible, setMakeUpCostConfirmModelVisible] = useState(false)
  const [currentClassFinancialMarketId, setCurrentFinancialMarketId] = useState(null)
  const [makeUpCostConfirmModelText, setMakeUpCostConfirmModelText] = useState("")

  /*useEffect(() => {
    if (classHourId) {
      // 查询金融市场数据
      dispatch({
        type: 'studentCreditors/gdebtQueryFinancialMarkets',
        payload: {
          classHourId
        }
      })
    }
  }, [])*/

  /**
   * 处理消息
   * @param message
   */
  const handleMsg = (message) => {
    const msgBody = JSON.parse(message.body);
    if (msgBody.msgType === 'FINMKT_GRAB_INFO') {
      dispatch({
        type: 'studentCreditors/setGrabInfo',
        payload: { ...msgBody.data, currentUserId: currentUser?.id },
      });
    } else if (msgBody.msgType === 'FINMKT_GRABBED') {
      dispatch({
        type: 'studentGrabLoan/setGrabbedData',
        payload: msgBody.data,
      });
    } else {
      console.log('未处理的MESSAGE：' + msgBody);
    }
  };

  useSubscription('/app/clshr/' + classHourId + '/finMkt/debt', handleMsg);

  /**
   * 债券抢单
   * @param financialMarketId row id
   */
  const gdebtGrab = (financialMarketId) => {
    if (classHourId && financialMarketId) {
      dispatch({
        type: 'studentCreditors/gdebtGrab',
        payload: { classHourId, financialMarketId },
      });
    }
  };

  const makeUpCostConfirmModelCancel = () => {
    setMakeUpCostConfirmModelVisible(false)
  }

  const makeUpCostConfirmModelOk = () => {
    doGrab(currentClassFinancialMarketId,true)
    setMakeUpCostConfirmModelVisible(false)
  }

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
      render: (amount) => (!amount ? null : `${amount / 10000}`),
    },

    {
      title: '收益率',
      dataIndex: 'expectRate',
      key: 'expectRate',
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
          <Button
            type="primary"
            size="small"
            onClick={() => gdebtGrab(classFinancialMarketId)}
            loading={grabLoading}
          >
            抢单
          </Button>
        );
      },
    },
  ];

  useEffect(() => {
    if (classHourId && startDuration) {
      dispatch({
        type: 'studentGrabDeposit/countDown',
      });
    }
  }, [classHourId, startDuration > 0]);

  const renderGrabStatus = () => {
    if (grabStatus === 'NONE') {
      return (
        <div className={styles.timer}>
          <span>抢单未开始</span>
        </div>
      );
    }
    if (grabStatus === 'STARTED') {
      return (
        <div className={styles.timer}>
          抢单倒计时：<span>{startDuration ?? 0}秒</span>
        </div>
      );
    }
    if (grabStatus === 'ENDED') {
      return (
        <div className={styles.timer}>
          <span>抢单已结束</span>
        </div>
      );
    }
    return <div></div>;
  };

  return (
    <>
      <Card
        size={'small'}
        type="inner"
      >
        {renderGrabStatus()}
      </Card>
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      <CreditorsRule />
      <Modal
        visible={makeUpCostConfirmModelVisible}
        onCancel={makeUpCostConfirmModelCancel}
        onOk={makeUpCostConfirmModelOk}
        title='是否补足营销费用'
        width={400}
      >
        {makeUpCostConfirmModelText}
      </Modal>
    </>
  );
};

export default connect(({ studentCreditors, loading }) => ({
  dataSource:
    studentCreditors.startDuration && studentCreditors.startDuration > 0
      ? []
      : studentCreditors.financialMarketData,
  grabStatus: studentCreditors.grabStatus,
  startDuration: studentCreditors.startDuration,
  loading: loading.effects['studentCreditors/gdebtQueryFinancialMarkets'],
  grabLoading: loading.effects['studentCreditors/gdebtGrab'],
}))(CreditorsTabMarket);
