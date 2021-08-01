import React, {useEffect, useState} from 'react';
import {connect} from "umi";
import {Button, Card, Space, Descriptions, Empty, Popconfirm, message} from 'antd';
import NewClassroomModal from "@/pages/teacher/classroom/NewClassroomModal";
import SwitchClassroomModal from "@/pages/teacher/classroom/SwitchClassroomModal";

const ClassroomInformation = (props) => {
  const {dispatch, teacherInClassData} = props
  // 新建课堂modal显示状态 ----start-----
  const [newClassroomModalVisible, setNewClassroomModalVisible] = useState(false);

  // 显示modal
  const handleNewClassroomShowModal = () => {
    setNewClassroomModalVisible(true);
  };

  // 关闭modal
  const handleNewClassroomCancelModal = () => {
    setNewClassroomModalVisible(false);
  };
  // 新建课堂modal显示状态 ----end-----

  // 切换课堂modal显示状态 ----start-----
  const [switchClassroomModalVisible, setSwitchClassroomModalVisible] = useState(false);

  // 显示modal
  const handleSwitchClassroomShowModal = () => {
    setSwitchClassroomModalVisible(true);
  };

  // 关闭modal
  const handleSwitchClassroomCancelModal = () => {
    setSwitchClassroomModalVisible(false);
  };
  // 切换课堂modal显示状态 ----end-----


  // 获取当前正在进行的课堂状态
  const TEACHER_IN_CLASS = !!localStorage.getItem('TEACHER_IN_CLASS')

  // 获取当前正在进行的课堂信息 redux中的teacherInClassData不存在 拿localStorage里面的
  const {
    classHourCode,
    tchNickname,
    classHourName,
    classHourStatusName,
    classHourId,
  } = teacherInClassData !== undefined ? teacherInClassData : JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}

  // 结束课堂
  const endClassHour = () => {
    dispatch({
      type: 'classroom/endClassHour',
      payload: {
        classHourId
      }
    })
  }

  const handleCancelClassOverModal = () => {
    message.error('已取消');
  }

  return (
    <Card
      title="课堂信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Button type="primary" onClick={handleNewClassroomShowModal}>新建课堂</Button>
            <Button type="primary" onClick={handleSwitchClassroomShowModal}>切换课堂</Button>
            <Popconfirm
              title="确认下课"
              onConfirm={endClassHour}
              onCancel={handleCancelClassOverModal}
            >
              <Button>下课</Button>
            </Popconfirm>
          </Space>
        </>
      }
      type='inner'
    >
      {TEACHER_IN_CLASS && TEACHER_IN_CLASS === true ? (
        <Descriptions column={2}>
          <Descriptions.Item label="课堂编号">{classHourCode}</Descriptions.Item>
          <Descriptions.Item label="教师名称">{tchNickname}</Descriptions.Item>
          <Descriptions.Item label="课堂名称">{classHourName}</Descriptions.Item>
          <Descriptions.Item label="课堂状态"><span style={{color: "red"}}>{classHourStatusName}</span></Descriptions.Item>
        </Descriptions>
      ) : <Empty/>}

      {/*新建课堂modal*/}
      <NewClassroomModal
        newClassroomModalVisible={newClassroomModalVisible}
        handleNewClassroomCancelModal={handleNewClassroomCancelModal}
      />
      {/*切换课堂modal*/}
      {
        switchClassroomModalVisible && <SwitchClassroomModal
          switchClassroomModalVisible={switchClassroomModalVisible}
          handleSwitchClassroomCancelModal={handleSwitchClassroomCancelModal}
        />
      }

    </Card>
  )
}

export default connect(({classroom}) => ({
  teacherInClassData: classroom.classroomTeacherInClassData
}))(ClassroomInformation)
