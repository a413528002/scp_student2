import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {Modal, message} from "antd";
import PublicTable from "@/components/Table";

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
      if (selectedRowsData.classHourStatusName === '上课中') {
        // 选中当前行直接展示
        // 存储localStorage
        localStorage.setItem('STUDENT_IN_CLASS', JSON.stringify(selectedRowsData))
        localStorage.setItem('STUDENT_IN_CLASS_STATE', '已加入')
        // 关闭modal
        handleSwitchClassroomCancelModal()
        message.success('切换课堂成功')
      } else {
        message.error('已下课，不可以切换')
      }

    } else {
      message.error('未选择课堂')
    }

  }

  // 获取切换课堂表格数据
  const getSwitchClassroomTableData = () => {
    dispatch({
      type: 'studentClassroom/queryJoinedClassHours',
      payload: {
        // page: 0,
        // size: 20,
      }
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
      disabled: record.classHourStatusName === '已下课',
      // Column configuration not to be checked
      classHourStatusName: record.classHourStatusName,
    }),
  };
  // 表头
  const columns = [
    {
      title: '课堂编号',
      dataIndex: 'classHourCode',
      key: 'classHourCode',
    },
    {
      title: '课堂名称',
      dataIndex: 'classHourName',
      key: 'classHourName',
    },
    {
      title: '课堂状态',
      dataIndex: 'classHourStatusName',
      key: 'classHourStatusName',
    },
    {
      title: '教师名称',
      dataIndex: 'tchNickname',
      key: 'tchNickname',
    },
    {
      title: '学生状态',
      dataIndex: 'classHourStatusName',
      key: 'classHourStatusName',
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
      />
    </Modal>
  );
};

export default connect(({studentClassroom, loading}) => ({
  dataSource: studentClassroom.studentClassroomQueryJoinedClassHoursData,
  switchLoading: loading.effects['studentClassroom/queryJoinedClassHours']
}))(SwitchClassroomModal);
