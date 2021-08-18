import React, { useEffect, useState } from 'react';
import PublicTable from '@/components/Table';
import styles from '@/pages/student/deal/deposit/index.less';
import { connect, useModel } from 'umi';
import { Button, Modal } from 'antd';
import { toPercent } from '@/utils/commonUtils';
import { useSubscription } from 'react-stomp-hooks';

const DepositTabRob = (props) => {
  const {dispatch, dataSource, startDuration} = props
  const {loading, grabLoading} = props

  const { initialState } = useModel('@@initialState');
  const { currentUser } = initialState

  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}

  const [makeUpCostConfirmModelVisible, setMakeUpCostConfirmModelVisible] = useState(false)
  const [currentClassFinancialMarketId, setCurrentFinancialMarketId] = useState(null)
  const [makeUpCostConfirmModelText, setMakeUpCostConfirmModelText] = useState("")

  /**
   * 处理消息
   * @param message
   */
  const handleMsg = (message) => {
    const msgBody = JSON.parse(message.body);
    if (msgBody.msgType === 'FINMKT_GRAB_INFO') {
      dispatch({
        type: 'studentGrabDeposit/setGrabInfo',
        payload: { ...msgBody.data, currentUserId: currentUser?.id }
      })
    } else if (msgBody.msgType === 'FINMKT_GRABBED') {
      dispatch({
        type: 'studentGrabDeposit/setGrabbedData',
        payload: msgBody.data
      })
    }
  }

  useSubscription('/app/clshr/' + classHourId + '/finMkt/dpst', handleMsg);

  // 执行抢单
  const doGrab = (classFinancialMarketId, makeUpCost) => {
    setCurrentFinancialMarketId(classFinancialMarketId)
    dispatch({
      type: 'studentGrabDeposit/grab',
      payload: { classHourId, classFinancialMarketId, makeUpCost },
      callback: (response) => {
        if (response.errCode === 31 && !makeUpCostConfirmModelVisible) {
          setMakeUpCostConfirmModelText(response.errMsg)
          setMakeUpCostConfirmModelVisible(true)
        } else {
          setCurrentFinancialMarketId(null)
        }
      }
    })
  }

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
      dataIndex: 'orderNo',
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
    },
    {
      title: '利率',
      dataIndex: 'expectRate',
      render: (val) => toPercent(val),
    },
    {
      title: '期限',
      dataIndex: 'term',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'region',
    },
    {
      title: '抢单',
      render: (_, {classFinancialMarketId, status}) => {
        return (
          <Button type={'primary'} onClick={() => doGrab(classFinancialMarketId, false)} loading={grabLoading} disabled={status !== 'NORMAL'}>抢单</Button>
        )
      }
    },
  ];

  useEffect(() => {
    if (classHourId && startDuration) {
      dispatch({
        type: 'studentGrabDeposit/countDown',
      })
    }
  }, [classHourId, startDuration > 0])

  return (
    <>
      <p className={styles.timer}>抢单倒计时：<span>{startDuration ?? 0}秒</span></p>
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
        pagination={{
          defaultPageSize: 10,
          total: dataSource.length,
        }}
      />
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

export default connect(({studentGrabDeposit, loading}) => ({
  dataSource: studentGrabDeposit.startDuration && studentGrabDeposit.startDuration > 0 ? [] : studentGrabDeposit.financialMarketData,
  startDuration: studentGrabDeposit.startDuration,
  loading:loading.effects['studentGrabDeposit/countDown'],
  grabLoading:loading.effects['studentGrabDeposit/grab']
}))(DepositTabRob);
