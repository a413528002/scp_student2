import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Descriptions, Empty, message, Popconfirm, Space } from 'antd';
import NewClassroomModal from '@/pages/teacher/classroom/NewClassroomModal';
import SwitchClassroomModal from '@/pages/teacher/classroom/SwitchClassroomModal';

const ClassroomInformation = (props) => {
  const { dispatch, teacherInClassData, startClassHourLoading } = props;

  const TEACHER_IN_CLASS = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS'));

  const {
    classHourCode,
    tchNickname,
    classHourName,
    classHourStatusName,
    classHourId,
    classHourStatus,
  } = teacherInClassData;

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

  // 结束课堂
  const endClassHour = () => {
    if (classHourId){
      dispatch({
        type: 'teacherClassroom/endClassHour',
        payload: {
          classHourId,
        },
      });
    }
  };
  // 开始课堂并且选择课堂
  const startClassHour = () => {
    if (classHourId) {
      dispatch({
        type: 'teacherClassroom/startClassHour',
        payload: {
          classHourId,
        },
      });
    }
  };
  // 关闭pop
  const handleCancelClassOverModal = () => {
    message.error('已取消');
  };

  useEffect(() => {
    if (!classHourId && TEACHER_IN_CLASS) {
      dispatch({
        type: 'teacherClassroom/switchClassroom',
        payload: TEACHER_IN_CLASS,
      });
    }
  }, [classHourId]);

  return (
    <Card
      title="课堂信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Button type="primary" onClick={handleNewClassroomShowModal}>
              新建课堂
            </Button>
            <Button type="primary" onClick={handleSwitchClassroomShowModal}>
              切换课堂
            </Button>
            {classHourStatus && classHourStatus === 'INIT' ? (
              <Button type="primary" onClick={startClassHour} loading={startClassHourLoading}>
                上课
              </Button>
            ) : (
              <Popconfirm
                title="确认下课"
                onConfirm={endClassHour}
                onCancel={handleCancelClassOverModal}
              >
                <Button>下课</Button>
              </Popconfirm>
            )}
          </Space>
        </>
      }
      type="inner"
    >
      {classHourId ? (
        <Descriptions column={2}>
          <Descriptions.Item label="课堂编号">{classHourCode}</Descriptions.Item>
          <Descriptions.Item label="教师名称">{tchNickname}</Descriptions.Item>
          <Descriptions.Item label="课堂名称">{classHourName}</Descriptions.Item>
          <Descriptions.Item label="课堂状态">
            <span style={{ color: 'red' }}>{classHourStatusName}</span>
          </Descriptions.Item>
        </Descriptions>
      ) : (
        <Empty />
      )}

      {/* 新建课堂modal */}
      <NewClassroomModal
        newClassroomModalVisible={newClassroomModalVisible}
        handleNewClassroomCancelModal={handleNewClassroomCancelModal}
      />
      {/* 切换课堂modal */}
      {switchClassroomModalVisible && (
        <SwitchClassroomModal
          switchClassroomModalVisible={switchClassroomModalVisible}
          handleSwitchClassroomCancelModal={handleSwitchClassroomCancelModal}
        />
      )}
    </Card>
  );
};

export default connect(({ teacherClassroom, loading }) => ({
  teacherInClassData: teacherClassroom.teacherClassroomTeacherInClassData,
  startClassHourLoading: loading.effects['teacherClassroom/startClassHour'],
}))(ClassroomInformation);
