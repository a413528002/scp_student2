import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Card} from "antd";
import PublicTable from "@/components/Table";
import MarketingPutIntoRemark from "@/pages/student/plan/marketing/MarketingPutIntoRemark";

const MarketingPutInto = (props) => {
  const {dispatch,dataSource,loading} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId){
      // 查询往期投入
      dispatch({
        type: 'studentPlan/queryBankMarketings',
        payload: {classHourId}
      })
    }
  }, [])
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render:(period)=>`第${period}期`
    },
    {
      title: '存款营销费用(万元)',
      dataIndex: 'depositMktCost',
      key: 'depositMktCost',
      render:(depositMktCost)=>`${depositMktCost/10000}`
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'loanMktCost',
      key: 'loanMktCost',
      render:(loanMktCost)=>`${loanMktCost/10000}`
    },
    {
      title: '超额补足倍率',
      dataIndex: 'makeUpRate',
      key: 'makeUpRate',
    },
    {
      title: '多余营销费用(万元)',
      dataIndex: 'remainingCost',
      key: 'remainingCost',
      render:(remainingCost)=>`${remainingCost/10000}`
    },
  ];
  return (
    <Card
      title='往期投入'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
      />
      <MarketingPutIntoRemark/>
    </Card>
  );
};

export default connect(({studentPlan, loading}) => ({
  dataSource: studentPlan.bankMarketingsData,
  loading: loading.effects['studentPlan/queryBankMarketings']
}))(MarketingPutInto);
