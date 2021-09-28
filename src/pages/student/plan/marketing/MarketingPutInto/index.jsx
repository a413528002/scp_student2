import React, {useEffect} from 'react';
import {connect} from 'umi'
import {Card} from "antd";
import PublicTable from "@/components/Table";
import MarketingPutIntoRemark from "@/pages/student/plan/marketing/MarketingPutIntoRemark";
import Million from '@/components/Million';

const MarketingPutInto = (props) => {
  const { dispatch, dataSource, loading } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  useEffect(() => {
    if (classHourId) {
      // 查询往期投入
      dispatch({
        type: 'studentMarketing/queryBankMarketings',
        payload: { classHourId },
      });
    }
  }, []);
  const columns = [
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '存款营销费用(万元)',
      dataIndex: 'depositMktCost',
      key: 'depositMktCost',
      render: (depositMktCost) => <Million>{depositMktCost}</Million>,
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'loanMktCost',
      key: 'loanMktCost',
      render: (loanMktCost) => <Million>{loanMktCost}</Million>,
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
      render: (remainingCost) => <Million>{remainingCost}</Million>,
    },
  ];
  return (
    <Card title="往期投入" bordered={false} type="inner">
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      <MarketingPutIntoRemark />
    </Card>
  );
};

export default connect(({studentMarketing, loading}) => ({
  dataSource: studentMarketing.bankMarketingsData,
  loading: loading.effects['studentMarketing/queryBankMarketings']
}))(MarketingPutInto);
