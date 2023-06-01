import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Select } from 'antd';
import { useRequest } from '@/.umi/plugin-request/request';

const ErrorContent = (props) => {
  const { dispatch, loading } = props;
  const { dataSource, total } = props;
  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);
  const [bankId, setBankId] = useState(null);
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {};
  useEffect(() => {
    // 查询各个银行错误记录
    if (classHourId) {
      dispatch({
        type: 'teacherBusiness/queryBankWrongs',
        payload: { classHourId, bankId, sort: 'id,desc', page, size },
      });
    }
  }, [page, size, bankId, classHourId]);

  const { data: bankData, loading: bankLoading } = useRequest(
    {
      url: '/scp-api/teacher/om/queryBanks',
      method: 'get',
      params: { classHourId },
    },
    {
      formatResult: (res) => res,
    },
  );

  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '业务功能',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: '提交时间',
      dataIndex: 'testingTime',
      key: 'testingTime',
    },
    {
      title: '错误值',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: '正确值',
      dataIndex: 'value2',
      key: 'value2',
    },
  ];
  return (
    <>
      <Select
        placeholder={'选择银行'}
        allowClear
        options={bankData?.map((item) => ({ label: item.name, value: item.id }))}
        onSelect={(value) => {
          setBankId(value);
        }}
        onClear={() => {
          setBankId(null);
        }}
      />
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
    </>
  );
};

export default connect(({ teacherBusiness, loading }) => ({
  dataSource: teacherBusiness.queryBankWrongsData.content,
  total: teacherBusiness.queryBankWrongsTotalElements,
  loading: loading.effects['teacherBusiness/queryBankWrongs'],
}))(ErrorContent);
