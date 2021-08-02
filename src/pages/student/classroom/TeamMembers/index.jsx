import React, {useEffect} from 'react';
import {connect} from "umi";
import {Button, Card, Popconfirm, Space} from "antd";
import PublicTable from "@/components/Table";

const TeamMembers = (props) => {
  const {dispatch, studentInClassData, loading, dataSource} = props;
  // 获取当前正在进行的课堂状态
  const STUDENT_IN_CLASS = !!localStorage.getItem('STUDENT_IN_CLASS')
  // 获取学生信息 sessionStorage
  const {nickname} = JSON.parse(sessionStorage.getItem('AUTHORITIES_INFO'))

  // 获取当前搜索到的课堂信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {
    classHourId,
  } = !!studentInClassData ? studentInClassData : JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  /**
   * 获取表格信息
   * 查询用户在课堂的详细信息
   */
  const getTeamMembersTableData = () => {
    dispatch({
      type: 'studentClassroom/queryClassHourUserDetails',
      payload: {
        classHourId
      }
    })
  }
  useEffect(() => {
    if (STUDENT_IN_CLASS) {
      getTeamMembersTableData()
    }
  }, [])
  const columns = [
    {
      title: '用户',
      dataIndex: 'name',
      key: 'name',
      render: (text, record, index) => `00${index + 1}`
    },
    {
      title: '名称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '岗位',
      dataIndex: 'bankPositionName',
      key: 'bankPositionName',
    },
    {
      title: '操作',
      dataIndex: 'address',
      key: 'address',
      render: (_, {stuUserId, bankPositionName}) => (
        <Space>
          <Button type='primary' size='small'>
            同意
          </Button>
          <Button size='small'>
            踢出
          </Button>
        </Space>
        /*<Popconfirm
          title="确认踢出?"
          // onConfirm={() => kickClassHourUser(stuUserId)}
          // onCancel={handleCancelPop}
        >
          {
            bankPositionName==='行长'?'':(

            )
          }
        </Popconfirm>*/
      )
    },
  ];
  return (
    <Card
      title="团队成员"
      bordered={false}
      type='inner'
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        bordered
        loading={loading}
      />
    </Card>
  );
};

export default connect(({studentClassroom, loading}) => ({
  studentInClassData: studentClassroom.studentClassroomStudentInClassData,
  dataSource: studentClassroom.studentClassroomQueryClassHourUserDetailsData,
  loading: loading.effects['studentClassroom/queryClassHourUserDetails']
}))(TeamMembers);
