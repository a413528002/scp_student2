import React, { useEffect, useState } from 'react';
import PublicTable from "@/components/Table";
import styles from '@/pages/student/deal/loan/index.less'
import { Button, Card, Modal } from 'antd';
import { connect, useModel } from 'umi';
import { useSubscription } from 'react-stomp-hooks';
import { toPercent } from '@/utils/commonUtils';

const LoanTabRob = (props) => {
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
        type: 'studentGrabLoan/setGrabInfo',
        payload: { ...msgBody.data, currentUserId: currentUser?.id }
      })
    } else if (msgBody.msgType === 'FINMKT_GRABBED') {
      dispatch({
        type: 'studentGrabLoan/setGrabbedData',
        payload: msgBody.data
      })
    } else {
      console.log("未处理的MESSAGE：" + msgBody)
    }
  }

  useSubscription('/app/clshr/' + classHourId + '/finMkt/loan', handleMsg);

  // 执行抢单
  const doGrab = (classFinancialMarketId, makeUpCost) => {
    setCurrentFinancialMarketId(classFinancialMarketId)
    dispatch({
      type: 'studentGrabLoan/grab',
      payload: { classHourId, classFinancialMarketId, makeUpCost },
      callback: (response) => {
        if (response.errCode === 32 && !makeUpCostConfirmModelVisible) {
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
      dataIndex: 'loanTypeName',
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
      title: '贷款分类',
      dataIndex: 'creditRating',
    },
    {
      title: '利率类型',
      dataIndex: 'rateTypeName',
    },
    {
      title: '质押/担保金额(万元)',
      dataIndex: 'mgMoney',
      render: (amount) => `${amount / 10000}`,
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
        type: 'studentGrabLoan/countDown',
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

export default connect(({studentGrabLoan, loading}) => ({
  dataSource: studentGrabLoan.startDuration && studentGrabLoan.startDuration > 0 ? [] : studentGrabLoan.financialMarketData,
  grabStatus: studentGrabLoan.grabStatus,
  startDuration: studentGrabLoan.startDuration,
  loading:loading.effects['studentGrabLoan/countDown'],
  grabLoading:loading.effects['studentGrabLoan/grab']
}))(LoanTabRob);
