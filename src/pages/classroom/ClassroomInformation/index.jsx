import React, {useEffect, useState} from 'react';
import {connect} from "umi";
import {Button, Card, Input, Space, Descriptions, Empty} from 'antd';
import SwitchClassroomModal from "@/pages/classroom/SwitchClassroomModal";


const {Search} = Input;
const ClassroomInformation = (props) => {
  const {dispatch, searchLoading, studentInClassData, studentInClassStateData} = props
  // 获取当前正在进行的课堂状态
  const STUDENT_IN_CLASS = !!localStorage.getItem('STUDENT_IN_CLASS')
  // 获取学生信息 sessionStorage
  const {nickname} = JSON.parse(sessionStorage.getItem('STUDENT_INFO'))

  // 获取当前搜索到的课堂信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {
    classHourCode,
    tchNickname,
    classHourName,
    classHourStatusName,
    classHourId,
  } = studentInClassData !== undefined ? studentInClassData : JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  // 学生上课的状态 redux中的studentInClassStateData不存在 拿localStorage里面的
  const studentInClassState = studentInClassStateData !== undefined ? studentInClassStateData : localStorage.getItem('STUDENT_IN_CLASS_STATE') || ''
  // 根据课堂编码查询课堂
  const onSearchQueryClassHourByCode = code => {
    dispatch({
      type: 'classroom/queryClassHourByCode',
      payload: {
        code
      }
    })
  }
  // 加入课堂
  const joinClassHour = () => {
    dispatch({
      type: 'classroom/joinClassHour',
      payload: {
        classHourId,
        nickname
      }
    })
  }
  // 退出课堂
  const exitClassHour = () => {
    dispatch({
      type: 'classroom/exitClassHour',
      payload: {
        classHourId
      }
    })
  }

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

  return (
    <Card
      title="课堂信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Search
              placeholder="请输入课堂编号"
              onSearch={onSearchQueryClassHourByCode}
              style={{width: 300}}
              enterButton="查询课堂"
              loading={searchLoading}
            />

            <Button type="primary" onClick={joinClassHour}>加入课堂</Button>
            <Button type="primary" onClick={handleSwitchClassroomShowModal}>切换课堂</Button>
            <Button onClick={exitClassHour}>退出课堂</Button>
          </Space>
        </>
      }
      type='inner'
    >
      {
        STUDENT_IN_CLASS && STUDENT_IN_CLASS === true ? (
          <Descriptions column={2}>
            <Descriptions.Item label="课堂编号">{classHourCode}</Descriptions.Item>
            <Descriptions.Item label="教师名称">{tchNickname}</Descriptions.Item>
            <Descriptions.Item label="课堂名称">{classHourName}</Descriptions.Item>
            <Descriptions.Item label="学生名称">{nickname}</Descriptions.Item>
            <Descriptions.Item label="课堂状态"><span
              style={{color: "red"}}>{classHourStatusName}</span></Descriptions.Item>
            <Descriptions.Item label="学生状态"><span
              style={{color: "red"}}>{studentInClassState}</span></Descriptions.Item>
          </Descriptions>
        ) : <Empty/>
      }
      {/*切换课堂modal*/}
      {
        switchClassroomModalVisible && <SwitchClassroomModal
          switchClassroomModalVisible={switchClassroomModalVisible}
          handleSwitchClassroomCancelModal={handleSwitchClassroomCancelModal}
        />
      }
    </Card>
  );
}

export default connect(({classroom, loading}) => ({
  studentInClassData: classroom.classroomStudentInClassData,
  studentInClassStateData: classroom.classroomStudentInClassStateData,
  searchLoading: loading.effects['classroom/queryClassHourByCode']
}))(ClassroomInformation)
