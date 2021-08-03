import React, {useEffect} from 'react';
import {connect} from "umi";
import {Button, Card, Popconfirm, message, Space} from "antd";
import PublicTable from "@/components/Table";

const TeamMembers = (props) => {
  const {dispatch, studentInClassData, loading, queryClassHourUserDetailsData} = props;
  const {isPresident, bankMembers: dataSource} = queryClassHourUserDetailsData
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
    // 学生当前课堂信息存在时请求
    if (STUDENT_IN_CLASS) {
      getTeamMembersTableData()
    }
  }, [])

  /**
   * 踢出银行成员
   * @param stuUserId
   */
  const kickBankMember = (stuUserId) => {
    dispatch({
      type: 'studentClassroom/kickBankMember',
      payload: {
        classHourId,
        stuUserId
      }
    })
  }
  /**
   * 同意加入银行
   * @param stuUserId
   */
  const acceptBankMember = (stuUserId)=>{
    dispatch({
      type:'studentClassroom/acceptBankMember',
      payload:{
        classHourId,
        stuUserId
      }
    })
  }

  // 取消pop
  const handleCancelPop = () => {
    message.error('已取消')
  }
  const columns = [
    {
      title: '用户',
      dataIndex: 'stuUsername',
      key: 'stuUsername',
      // render: (text, record, index) => `00${index + 1}`
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
      render: (_, {stuUserId, bankStatus}) => {
        return (
          <Space>
            {
              bankStatus === 'PENDING' ? (
                <Popconfirm
                  title="确认同意"
                  onConfirm={() => acceptBankMember(stuUserId)}
                  onCancel={handleCancelPop}
                >
                  <Button type='primary' size='small'>
                    同意
                  </Button>
                </Popconfirm>
              ) : null
            }
            {
              isPresident && isPresident === true ? (
                <Popconfirm
                  title="确认踢出?"
                  onConfirm={() => kickBankMember(stuUserId)}
                  onCancel={handleCancelPop}
                >
                  <Button size='small'>
                    踢出
                  </Button>
                </Popconfirm>
              ) : null
            }
          </Space>
        )
        /*switch (bankStatus) {
          case 'PENDING':
            return (
              <>

              </>
            )
          default:
            return (
              <>
                {
                  isPresident && isPresident === true ? (
                    <Popconfirm
                      title="确认踢出?"
                      onConfirm={() => kickBankMember(stuUserId)}
                      onCancel={handleCancelPop}
                    >
                    <Button size='small'>
                      踢出
                    </Button>
                    </Popconfirm>
                  ) : null
                }
              </>

            )
        }*/
      }
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
  queryClassHourUserDetailsData: studentClassroom.studentClassroomQueryClassHourUserDetailsData,
  loading: loading.effects['studentClassroom/queryClassHourUserDetails']
}))(TeamMembers);
