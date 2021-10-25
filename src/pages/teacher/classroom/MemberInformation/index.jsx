import React from 'react';
import { connect } from 'umi';
import { Button, Card, message, Popconfirm, Badge } from 'antd';
import PublicTable from '@/components/Table';

const MemberInformation = (props) => {
  const { dispatch, dataSource, loading } = props;
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {};
  // 获取当前正在进行的课堂状态
  const TEACHER_IN_CLASS = !!localStorage.getItem('TEACHER_IN_CLASS');
  // 获取课堂成员
  const getMemberTableData = () => {
    dispatch({
      type: 'teacherClassroom/queryClassHourUsers',
      payload: {
        classHourId,
      },
    });
  };

  // 踢出课堂成员
  const kickClassHourUser = (stuUserId) => {
    if (TEACHER_IN_CLASS) {
      dispatch({
        type: 'teacherClassroom/kickClassHourUser',
        payload: {
          stuUserId,
          classHourId,
        },
      });
    }
  };
  // 关闭pop确认
  const handleCancelPop = () => {
    message.error('已取消');
  };
  const columns = [
    {
      title: '用户',
      dataIndex: 'stuUsername',
    },
    {
      title: '名称',
      dataIndex: 'nickname',
    },
    {
      title: '银行',
      dataIndex: 'bankName',
    },
    {
      title: '岗位',
      dataIndex: 'bankPositionName',
    },
    {
      title: '学生状态',
      dataIndex: 'stuStatusName',
    },
    {
      title: '在线状态',
      dataIndex: 'online',
      render: (online) => {
        switch (online) {
          case true:
            return <Badge status="processing" text="在线" />;
          case false:
            return <Badge status="default" text="离线" />;
          default:
            break;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'opt',
      render: (_, { stuUserId, stuStatus }) => (
        <Popconfirm
          disabled={stuStatus !== 'NORMAL'}
          title="确认踢出?"
          onConfirm={() => kickClassHourUser(stuUserId)}
          onCancel={handleCancelPop}
        >
          <Button type="primary" size="small" disabled={stuStatus !== 'NORMAL'}>
            踢出
          </Button>
        </Popconfirm>
      ),
    },
  ];
  return (
    <Card
      title="成员信息"
      bordered={false}
      type="inner"
      extra={
        <Button type="primary" onClick={getMemberTableData} loading={loading}>
          刷新
        </Button>
      }
    >
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
    </Card>
  );
};
export default connect(({ teacherClassroom, loading }) => ({
  dataSource: teacherClassroom.teacherClassroomQueryClassHourUsersData,
  loading: loading.effects['teacherClassroom/queryClassHourUsers'],
}))(MemberInformation);
