import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";

const InstitutionsContent = (props) => {
  const {dispatch, loading} = props;
  const {dataSource} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
  useEffect(() => {
    // 查询各个银行机构信息
    if (classHourId) {
      dispatch({
        type: 'teacherBusiness/queryBankOrganizations',
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
      title: '是否建立总行',
      dataIndex: 'moduleName',
      key: 'moduleName',
    },
    {
      title: 'A区',
      dataIndex: 'testingTime',
      key: 'testingTime',
    },
    {
      title: 'B区',
      dataIndex: 'value1',
      key: 'value1',
    },
    {
      title: 'C区',
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
  dataSource: teacherBusiness.queryBankOrganizationsDate.content,
  loading: loading.effects['teacherBusiness/queryBankOrganizations']
}))(InstitutionsContent);
