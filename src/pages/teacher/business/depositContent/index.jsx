import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Tags from "@/components/Tags";
import Million from "@/components/Million";
import {toPercent} from "@/utils/commonUtils";

const DepositContent = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {};
  useEffect(() => {
    // 查询各个银行机构信息
    if (classHourId) {
      /* dispatch({
        type: 'teacherBusiness/queryBankOrganizations',
        payload: { classHourId },
      }); */
    }
  }, []);
  const columns = [
    {
      title: '所属期数',
      dataIndex: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
      render: (customerTypeName) => <Tags>{customerTypeName}</Tags>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      render: (amount) => <Million>{amount}</Million>,
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
      render: (rateTypeName) => <Tags>{rateTypeName}</Tags>,
    },
    {
      title: '渠道类型',
      dataIndex: 'channelName',
    },
    {
      title: '区域',
      dataIndex: 'region',
    },
  ];
  return <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />;
};

export default connect(({ teacherBusiness, loading }) => ({
  // dataSource: teacherBusiness.queryBankOrganizationsData,
  loading: loading.effects['teacherBusiness/queryBankOrganizations'],
}))(DepositContent);
