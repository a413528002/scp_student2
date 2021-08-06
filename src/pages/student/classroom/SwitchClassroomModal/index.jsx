import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { message, Modal } from 'antd';
import PublicTable from '@/components/Table';

const SwitchClassroomModal = (props) => {
  const {handleSwitchClassroomCancelModal, switchClassroomModalVisible} = props
  const {dispatch, dataSource, switchLoading} = props
  const selectedInClassRow = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS'))
  const {classHourId: selectedInClassRowKey = []} = selectedInClassRow || {}
  // 表格选中的key
  const [selectedRowKeys, setSelectedRowKeys] = useState([selectedInClassRowKey])
  // 选中当前行的信息
  const [selectedRows, setSelectedRows] = useState([selectedInClassRow])

  // 开始课堂
  const startClassHour = () => {
    if (selectedRowKeys.length > 0) {
      const [selectedRowsData] = selectedRows
      // 选中当前行直接展示
      // 存储localStorage
      message.success('切换课堂成功')
      dispatch({
        type: 'studentClassroom/switchClassroom',
        payload: selectedRowsData
      })
      // 关闭modal
      handleSwitchClassroomCancelModal()
    } else {
      message.error('未选择课堂')
    }
  }

  // 获取切换课堂表格数据
  const getSwitchClassroomTableData = () => {
    dispatch({
      type: 'studentClassroom/queryJoinedClassHours',
    })
  }
  useEffect(() => {
    // 调用获取切换课堂表格数据
    getSwitchClassroomTableData()
  }, [])

  // 选择表格项事件
  const onSelectChange = (selectedRowKeys, selectedRows) => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    // console.log('selectedRows changed: ', selectedRows);
    setSelectedRowKeys(selectedRowKeys);
    setSelectedRows(selectedRows)
  };
  // 表格单选配置项
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    type: 'radio',
    getCheckboxProps: (record) => ({
      // 已下课不能被选中
      // disabled: record.classHourStatusName === '已下课',
      // Column configuration not to be checked
      classHourStatusName: record.classHourStatusName,
    }),
  };
  // 表头
  const columns = [
    {
      title: '课堂编号',
      dataIndex: 'classHourCode',
    },
    {
      title: '课堂名称',
      dataIndex: 'classHourName',
    },
    {
      title: '课堂状态',
      dataIndex: 'classHourStatusName',
    },
    {
      title: '教师名称',
      dataIndex: 'tchNickname',
    },
    {
      title: '学生状态',
      dataIndex: 'stuStatusName',
    },
  ];
  return (
    <Modal
      visible={switchClassroomModalVisible}
      onCancel={handleSwitchClassroomCancelModal}
      onOk={startClassHour}
      title='切换课堂'
      width={800}
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
        rowSelection={rowSelection}
        loading={switchLoading}
        pagination={{
          defaultPageSize: 10,
          total: dataSource.length,
        }}
      />
    </Modal>
  );
};

export default connect(({studentClassroom, loading}) => ({
  dataSource: studentClassroom.studentClassroomQueryJoinedClassHoursData,
  switchLoading: loading.effects['studentClassroom/queryJoinedClassHours']
}))(SwitchClassroomModal);
