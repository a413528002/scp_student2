import React, {useEffect} from 'react';
import {CheckCircleTwoTone, CloseCircleTwoTone} from '@ant-design/icons'
import {connect} from 'umi'
import PublicTable from "@/components/Table";

const SubmitContent = (props) => {
  const {dispatch, loading} = props;
  const {dataSource} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
  useEffect(() => {
    // 查询各个银行期间信息
    if (classHourId) {
      dispatch({
        type: 'teacherBusiness/queryBankPeriodInfos',
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
      title: '业务结账',
      dataIndex: 'businessEndFlag',
      key: 'businessEndFlag',
      render: (businessEndFlag) => businessEndFlag ? <CheckCircleTwoTone twoToneColor="#52c41a"/> :
        <CloseCircleTwoTone twoToneColor="#888"/>
    },
    {
      title: '财务结账',
      dataIndex: 'financeEndFlag',
      key: 'financeEndFlag',
      render: (financeEndFlag) => financeEndFlag ? <CheckCircleTwoTone twoToneColor="#52c41a"/> :
        <CloseCircleTwoTone twoToneColor="#888"/>
    },
    {
      title: '提交报表',
      dataIndex: 'reportFlag',
      key: 'reportFlag',
      render: (reportFlag) => reportFlag ? <CheckCircleTwoTone twoToneColor="#52c41a"/> :
        <CloseCircleTwoTone twoToneColor="#888"/>
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
  dataSource: teacherBusiness.queryBankPeriodInfosDate.content,
  loading: loading.effects['teacherBusiness/queryBankPeriodInfos']
}))(SubmitContent);
