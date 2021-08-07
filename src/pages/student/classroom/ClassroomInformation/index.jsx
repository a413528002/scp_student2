import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Descriptions, Empty, Input, message, Space } from 'antd';
import SwitchClassroomModal from '@/pages/student/classroom/SwitchClassroomModal';


const {Search} = Input;
const ClassroomInformation = (props) => {
  /**
   * joinLoading 加入课堂的loading
   * exitLoading 退出课堂的loading
   * searchLoading 搜索的loading
   * studentInClassData 当前课堂的信息
   * studentInClassStateData 课堂的状态（待完善）
   */
  const {dispatch, classData, classOpt} = props
  const {joinLoading, exitLoading, searchLoading} = props
  // 获取当前正在进行的课堂状态
  const STUDENT_IN_CLASS = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS'))

  const {
    classHourCode,
    tchNickname,
    classHourName,
    classHourStatusName,
    classHourId,
    stuNickname,
    stuStatusName,
  } = classData;

  // 学生上课的状态 redux中的studentInClassStateData不存在 拿localStorage里面的
  // const studentInClassState = !!studentInClassStateData ? studentInClassStateData : localStorage.getItem('STUDENT_IN_CLASS_STATE') || ''
  // 根据课堂编码查询课堂
  const onSearchQueryClassHourByCode = code => {
    // input为空时不搜索
    if (code.trim()) {
      // 如果搜索的课堂code与当前课堂的code相同，直接返回提示信息，不进行搜索
      // 可以搜索
      // if (classHourCode === code) {
      //   message.warn('已加入该课堂')
      //   return false
      // }
      dispatch({
        type: 'studentClassroom/queryClassHourByCode',
        payload: {
          code
        }
      })
    } else {
      message.error('请输入课堂编号')
    }

  }
  // 加入课堂
  const joinClassHour = () => {
    dispatch({
      type: 'studentClassroom/joinClassHour',
    })
  }
  // 退出课堂
  const exitClassHour = () => {
    if (classData.classHourId) {
      dispatch({
        type: 'studentClassroom/exitClassHour',
      })
    } else {
      message.error('没有已加入的课堂信息')
    }

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

  useEffect(() => {
    if (!classHourId && STUDENT_IN_CLASS) {
      dispatch({
        type: 'studentClassroom/switchClassroom',
        payload: STUDENT_IN_CLASS
      })
    }
  }, [classHourId])

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
              allowClear
            />
            <Button type="primary" onClick={joinClassHour} loading={joinLoading} disabled={stuStatusName === '已加入'}>加入课堂</Button>
            <Button type="primary" onClick={handleSwitchClassroomShowModal}>切换课堂</Button>
            <Button onClick={exitClassHour} loading={exitLoading} disabled={!classOpt}>退出课堂</Button>
          </Space>
        </>
      }
      type='inner'
    >
      {
        classHourId
          ? (
            <Descriptions column={2}>
              <Descriptions.Item label="课堂编号">{classHourCode}</Descriptions.Item>
              <Descriptions.Item label="教师名称">{tchNickname}</Descriptions.Item>
              <Descriptions.Item label="课堂名称">{classHourName}</Descriptions.Item>
              <Descriptions.Item label="学生名称">{stuNickname}</Descriptions.Item>
              <Descriptions.Item label="课堂状态"><span
                style={{color: "red"}}>{classHourStatusName}</span></Descriptions.Item>
              <Descriptions.Item label="学生状态"><span
                style={{color: "red"}}>{stuStatusName}</span></Descriptions.Item>
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

export default connect(({studentClassroom, loading}) => ({
  classData: studentClassroom.classData,
  classOpt: studentClassroom.classOpt,
  searchLoading: loading.effects['studentClassroom/queryClassHourByCode'],
  joinLoading: loading.effects['studentClassroom/joinClassHour'],
  exitLoading: loading.effects['studentClassroom/exitClassHour'],
}))(ClassroomInformation)
