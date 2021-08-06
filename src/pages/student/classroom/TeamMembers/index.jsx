import React from 'react';
import { connect } from 'umi';
import { Button, Card, message, Popconfirm, Space } from 'antd';
import PublicTable from '@/components/Table';

const TeamMembers = (props) => {
  const {dispatch, loading, bankMembersData} = props;

  /**
   * 踢出银行成员
   * @param stuUserId
   */
  const kickBankMember = (stuUserId) => {
    dispatch({
      type: 'studentClassroom/kickBankMember',
      payload: {
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
    },
    {
      title: '名称',
      dataIndex: 'nickname',
    },
    {
      title: '岗位',
      dataIndex: 'bankPositionName',
    },
    {
      title: '操作',
      key: 'address',
      render: (_, {stuUserId, _kickOpt, _acceptOpt}) => {
        return (
          <Space>
            {
              _acceptOpt
                ? <Popconfirm
                  title="确认同意"
                  onConfirm={() => acceptBankMember(stuUserId)}
                  onCancel={handleCancelPop}
                >
                  <Button type='primary' size='small'>
                    同意
                  </Button>
                </Popconfirm>
                : null
            }

            {
              _kickOpt
                ? <Popconfirm
                  title="确认踢出?"
                  onConfirm={() => kickBankMember(stuUserId)}
                  onCancel={handleCancelPop}
                >
                  <Button size='small'>
                    踢出
                  </Button>
                </Popconfirm>
                : null
            }

          </Space>
        )
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
        dataSource={bankMembersData}
        columns={columns}
        bordered
        loading={loading}
      />
    </Card>
  );
};

export default connect(({studentClassroom, loading}) => ({
  bankMembersData: studentClassroom.bankMembersData,
  loading: loading.effects['studentClassroom/queryClassHourUserDetails']
}))(TeamMembers);
