import React, {useEffect} from 'react';
import {connect} from "umi";
import {Card, Button, message, Popconfirm} from "antd";
import PublicTable from "@/components/Table";

const MemberInformation = (props) => {
    const {dispatch, dataSource, loading} = props
  console.log(dataSource)
    // 获取课堂id
    const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
    // 获取当前正在进行的课堂状态
    const TEACHER_IN_CLASS = !!localStorage.getItem('TEACHER_IN_CLASS')
    // 获取课堂成员
    const getMemberTableData = () => {
      dispatch({
        type: 'classroom/queryClassHourUsers',
        payload: {
          classHourId
        }
      })
    }
    useEffect(() => {
      if (TEACHER_IN_CLASS) {
        getMemberTableData()
      }
    }, [classHourId])


    // 踢出课堂成员
    const kickClassHourUser = (stuUserId) => {
      if (TEACHER_IN_CLASS) {
        dispatch({
          type: 'classroom/kickClassHourUser',
          payload: {
            stuUserId,
            classHourId
          }
        })
      }
    }
    // 关闭pop确认
    const handleCancelPop = () => {
      message.error('已取消')
    }
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
        title: '银行',
        dataIndex: 'bankName',
        key: 'bankName',
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
        render: (_, {stuUserId}) => (
          <Popconfirm
            title="确认踢出?"
            onConfirm={() => kickClassHourUser(stuUserId)}
            onCancel={handleCancelPop}
          >
            <Button type='primary' size='small'>
              踢出
            </Button>
          </Popconfirm>)
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
  }
;

export default connect(({classroom, loading}) => ({
  dataSource: classroom.classroomQueryClassHourUsersData,
  loading: loading.effects['classroom/queryClassHourUsers']
}))(MemberInformation);
