import React, { useEffect, useState } from 'react';
import PublicTable from '@/components/Table';
import styles from '@/pages/student/deal/deposit/index.less';
import { connect, useModel } from 'umi';
import { Button, Card, Modal, Tag } from 'antd';
import { toPercent } from '@/utils/commonUtils';
import { useSubscription } from 'react-stomp-hooks';

const DepositTabRob = (props) => {
  const {dispatch, dataSource, grabStatus, startDuration} = props
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
    } else {
      console.log("未处理的MESSAGE：" + msgBody)
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
      render: (customerTypeName) => <Tag color="#009933">{customerTypeName}</Tag>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      render: (amount) => `${amount / 10000}`,
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
      render: (rateTypeName) => <Tag color="#009933">{rateTypeName}</Tag>,
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'regionName',
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


  const renderGrabStatus = () => {
    if (grabStatus === 'NONE') {
      return <div className={styles.timer}><span>抢单未开始</span></div>
    }
    if (grabStatus === 'STARTED') {
      return <div className={styles.timer}>抢单倒计时：<span>{startDuration ?? 0}秒</span></div>
    }
    if (grabStatus === 'ENDED') {
      return <div className={styles.timer}><span>抢单已结束</span></div>
    }
    return <div></div>
  }

  return (
    <>
      <Card
        size={'small'}
        type="inner"
      >
        {renderGrabStatus()}
      </Card>

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
  grabStatus: studentGrabDeposit.grabStatus,
  startDuration: studentGrabDeposit.startDuration,
  loading:loading.effects['studentGrabDeposit/countDown'],
  grabLoading:loading.effects['studentGrabDeposit/grab']
}))(DepositTabRob);
