import React, { useEffect, useState } from 'react';
import PublicTable from '@/components/Table';
import styles from '@/pages/student/deal/deposit/index.less';
import { connect } from 'umi';
import { Button, Modal } from 'antd';
import { toPercent } from '@/utils/commonUtils';

const DepositTabRob = (props) => {
  const {dispatch, dataSource, grabStartTime} = props
  const {loading, grabLoading} = props

  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}

  const [makeUpCostConfirmModelVisible, setMakeUpCostConfirmModelVisible] = useState(false)
  const [currentFinancialMarketId, setCurrentFinancialMarketId] = useState(null)
  const [makeUpCostConfirmModelText, setMakeUpCostConfirmModelText] = useState("")


  // 执行抢单
  const doGrab = (financialMarketId, makeUpCost) => {
    setCurrentFinancialMarketId(financialMarketId)
    dispatch({
      type: 'studentGrabDeposit/grab',
      payload: { classHourId, financialMarketId, makeUpCost },
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
    doGrab(currentFinancialMarketId,true)
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
      render: (_, {financialMarketId, status}) => {
        return (
          <Button type={'primary'} onClick={() => doGrab(financialMarketId, false)} loading={grabLoading} disabled={status !== 'NORMAL'}>抢单</Button>
        )
      }
    },
  ];

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentGrabDeposit/queryFinancialMarkets',
        payload: { classHourId }
      })
    }
  }, [classHourId])

  return (
    <>
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
      <p className={styles.timer}>抢单倒计时：<span>30秒</span></p>
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
  dataSource: studentGrabDeposit.financialMarketData,
  grabStartTime: studentGrabDeposit.grabStartTime,
  loading:loading.effects['studentGrabDeposit/queryFinancialMarkets'],
  grabLoading:loading.effects['studentGrabDeposit/grab']
}))(DepositTabRob);
