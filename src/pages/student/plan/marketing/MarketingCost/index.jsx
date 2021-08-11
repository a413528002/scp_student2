import React, {useEffect} from 'react';
import {connect} from 'umi';
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";
import MarketingCostRule from "@/pages/student/plan/marketing/MarketingCostRule";

const MarketingCost = (props) => {
  const {dispatch, dataSource, loading} = props;
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId){
      dispatch({
        type: 'studentPlan/queryCurBankMarketing',
        payload: {
          classHourId
        }
      })
    }
  }, [])

  // 投入营销费用
  const inputMarketingCost = (values) => {
    dispatch({
      type: 'studentPlan/inputMarketingCost',
      payload: {
        classHourId,
        ...values
      }
    })
  }
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
    },
    {
      title: '存款营销费用(万元)',
      dataIndex: 'depositMktCost',
      key: 'depositMktCost',
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'loanMktCost',
      key: 'loanMktCost',
    },
    {
      title: '超额补足倍率',
      dataIndex: 'makeUpRate',
      key: 'makeUpRate',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, {depositMktCost, loanMktCost}) => (<Button
        type="primary"
        size="small"
        onClick={() => inputMarketingCost(depositMktCost, loanMktCost)}
      >
        提交
      </Button>)
    },
  ];
  return (
    <Card
      title='营销费用'
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
      />
      <MarketingCostRule/>
    </Card>
  );
};

export default connect(({studentPlan, loading}) => ({
  dataSource: studentPlan.bankMarketingData,
  loading: loading.effects['studentPlan/queryCurBankMarketing']
}))(MarketingCost);
