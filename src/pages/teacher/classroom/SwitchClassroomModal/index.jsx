import React, {useEffect, useState} from 'react';
import {connect} from 'umi'
import {Modal, message} from "antd";
import PublicTable from "@/components/Table";

const SwitchClassroomModal = (props) => {
  const {handleSwitchClassroomCancelModal, switchClassroomModalVisible} = props
  /**
   * dataSource 表格数据
   * switchLoading 表格loading
   * startLoading 开始课堂/切换课堂loading
   */
  const {dispatch, dataSource, switchLoading, startLoading} = props
  const selectedInClassRow = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS'))
  // 当前选中的课堂id
  const {classHourId: selectedInClassRowKey = []} = selectedInClassRow || {}
  // 表格选中的key
  const [selectedRowKeys, setSelectedRowKeys] = useState([selectedInClassRowKey])
  // 选中当前行的信息
  const [selectedRows, setSelectedRows] = useState([selectedInClassRow])

  // 开始课堂
  const startClassHour = () => {
    const [classHourId] = selectedRowKeys
    if (selectedRowKeys.length > 0) {
      const [selectedRowsData] = selectedRows
      if (selectedRowsData.classHourStatus === 'INIT') {
        // 课堂为初始状态才调用开始课堂
        dispatch({
          type: 'teacherClassroom/startClassHour',
          payload: {
            classHourId
          },
          callback: () => handleSwitchClassroomCancelModal()
        })
      } else {
        // 选中当前行直接展示
        handleSwitchClassroomCancelModal()
        dispatch({
          type: 'teacherClassroom/switchClassroom',
          payload:{
            ...selectedRowsData
          }
        })
      }
      // 切换后刷新成员信息
      dispatch({
        type: 'teacherClassroom/queryClassHourUsers',
        payload: {
          classHourId
        }
      })
    } else {
      message.error('未选择课堂')
    }

  }

  // 获取切换课堂表格数据 sort 写死 按照id倒序  把新的数据排在前面
  const getSwitchClassroomTableData = (page, size) => {
    dispatch({
      type: 'teacherClassroom/queryMyClassHours',
      payload: {
        sort: 'id,desc',
        page: page,
        size: size,
      }
    })
  }
  useEffect(() => {
    // 调用获取切换课堂表格数据
    getSwitchClassroomTableData(0,10)
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
      // disabled: record.classHourStatusName === '已下课', // 已下课得可以选中
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
    // {
    //   title: '学生数量',
    //   dataIndex: 'address',
    //   key: 'address',
    // },
  ];
  return (
    <Modal
      visible={switchClassroomModalVisible}
      onCancel={handleSwitchClassroomCancelModal}
      onOk={startClassHour}
      title='切换课堂'
      width={800}
      confirmLoading={startLoading}
    >
      <PublicTable
        dataSource={dataSource.content}
        columns={columns}
        bordered
        rowSelection={rowSelection}
        loading={switchLoading}
        pagination={{
          defaultPageSize: 10,
          total: dataSource.totalElements,
          onChange: (page, pageSize) => {
            getSwitchClassroomTableData(page - 1, pageSize)
          }
        }}
      />
    </Modal>
  );
};

export default connect(({teacherClassroom, loading}) => ({
  dataSource: teacherClassroom.teacherClassroomQueryMyClassHoursData,
  switchLoading: loading.effects['teacherClassroom/queryMyClassHours'],
  startLoading: loading.effects['teacherClassroom/startClassHour']
}))(SwitchClassroomModal);
