import React from 'react';
import {Card} from "antd";
import PublicTable from "@/components/Table";
import MarketingPutIntoRemark from "@/pages/plan/marketing/MarketingPutIntoRemark";

const MarketingPutInto = () => {
  const dataSource = [];
  const columns = [
    {
      title: '期数',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '存款营销费用(万元)',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '超额补足倍率',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '多余营销费用(万元)',
      dataIndex: 'address',
      key: 'address',
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
        bordered
      />
      <MarketingPutIntoRemark/>
    </Card>
  );
};

export default MarketingPutInto;
