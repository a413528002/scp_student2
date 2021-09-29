import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";
import FinancingRule from "@/pages/student/financial/financing/FinancingRule";
import {Button} from "antd";

const FinancingTabMarket = (props) => {
  const {dispatch, loading, grabLoading} = props;
  const {dataSource} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  /* useEffect(() => {
    if (classHourId) {
      // 查询金融市场数据
      dispatch({
        type: 'studentFinancing/gifQueryFinancialMarkets',
        payload: {classHourId}
      })
    }
  }, []) */
  /**
   * 投融资抢单
   * @param financialMarketId
   */
  const gifGrab = (financialMarketId) => {
    if (classHourId && financialMarketId) {
      dispatch({
        type: 'studentFinancing/gifGrab',
        payload: {classHourId, financialMarketId}
      })
    }
  }

  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`
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
      render: (amount) => !amount ? null : `${amount / 10000}`
    },

    {
      title: '预计收益率',
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
      render: (_, {status, classFinancialMarketId}) => {
        return (
          <>
            {
              status ? <Button
                type="primary"
                size="small"
                onClick={() => gifGrab(classFinancialMarketId)}
                loading={grabLoading}
              >抢单</Button> : null
            }
          </>
        )

      }
    },
  ];
  return (
    <>
      <PublicTable
        // dataSource={dataSource}
        // dataSource={originData}
        columns={columns}
        loading={loading}
        bordered
      />
      <FinancingRule/>
    </>

  );
};

export default connect(({studentFinancing, loading}) => ({
  dataSource: studentFinancing.gifQueryFinancialMarketsDate.data,
  loading: loading.effects['studentFinancing/gifQueryFinancialMarkets'],
  grabLoading: loading.effects['studentFinancing/gifGrab']
}))(FinancingTabMarket);
