import React, { useEffect } from 'react';
import PublicTable from '@/components/Table';
import { connect } from 'umi';

const OrganizationTable = (props) => {
  const {dispatch, dataSource} = props
  const {loading} = props

  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}

  const columns = [
    {
      title: '区域',
      dataIndex: 'regionName',
    },
    {
      title: '类别',
      dataIndex: 'typeName',
    },
    {
      title: '建设周期',
      dataIndex: 'spendPeriods',
    },
    {
      title: '建设方式',
      dataIndex: 'createTypeName',
    },
    {
      title: '折旧方式',
      dataIndex: 'depreciationMethodName',
    },
    {
      title: '折旧期限',
      dataIndex: 'depreciationPeriods',
    },
  ];

  useEffect(() => {
      if (classHourId) {
        dispatch({
          type: 'studentOrganization/queryBankOrganizations',
          payload: { classHourId }
        })
      }
  }, [classHourId])
  return (
    <>
     <PublicTable
       dataSource={dataSource}
       columns={columns}
       bordered
       loading={loading}
       pagination={{
         defaultPageSize: 10,
         total: dataSource.length,
       }}
     />
    </>
  );
};

export default connect(({studentOrganization, loading}) => ({
  dataSource: studentOrganization.organizationData,
  loading:loading.effects['studentOrganization/queryBankOrganizations']
}))(OrganizationTable);
