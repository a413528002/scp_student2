import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";

const ErrorContent = (props) => {
  const {dispatch, loading} = props;
  const {dataSource} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
  useEffect(() => {
    // 查询各个银行错误记录
    if (classHourId) {
      dispatch({
        type: 'teacherBusiness/queryBankWrongs',
        payload: {classHourId}
      })
    }
  }, [])
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
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
    />
  );
};

export default connect(({teacherBusiness, loading}) => ({
  dataSource: teacherBusiness.queryBankWrongsDate.content,
  loading: loading.effects['teacherBusiness/queryBankWrongs']
}))(ErrorContent);
