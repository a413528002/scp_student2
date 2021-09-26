import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import Million from '@/components/Million';
import PublicTable from '@/components/Table';

const MarketingContent = (props) => {
  const { dispatch, loading } = props;
  const { dataSource, total } = props;

  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {};
  useEffect(() => {
    // 查询各个银行错误记录
    if (classHourId) {
      dispatch({
        type: 'teacherBusiness/queryBankMarketings',
        payload: { classHourId, sort: 'id,desc', page, size },
      });
    }
  }, [page, size]);
  // 表头
  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '期数',
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
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
      pagination={{
        // 数据总数
        total,
        // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
        onChange: (page, pageSize) => {
          // 接口page是从0开始
          setPage(page - 1);
          setSize(pageSize);
        },
      }}
    />
  );
};

export default connect(({ teacherBusiness, loading }) => ({
  dataSource: teacherBusiness.queryBankMarketingsData.content,
  total: teacherBusiness.queryBankMarketingsTotalElements,
  loading: loading.effects['teacherBusiness/queryBankMarketings'],
}))(MarketingContent);
