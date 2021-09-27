import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Popconfirm, Space } from 'antd';
import PublicTable from '@/components/Table';
import UploadUserModal from '@/pages/admin/user/UploadUserModal';

const UserTable = (props) => {
  const { dispatch, loading, updateLoading, downloadLoading } = props;
  const { roles, dataSource, total } = props;
  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);

  // 获取角色
  useEffect(() => {
    // 分页查询
    dispatch({
      type: 'adminUser/queryRoles',
    });
  }, []);

  // 获取课堂id
  useEffect(() => {
    // 分页查询
    dispatch({
      type: 'adminUser/queryUsers',
      payload: { page, size, sort: 'id,desc' },
    });
  }, [page, size]);

  // 下载用户导入模板
  const template = () => {
    dispatch({
      type: 'adminUser/template',
    });
  };
  // 导入用户modal状态
  const [modalVisible, setModalVisible] = useState(false);
  // 显示uploadModal
  const handleShowModal = () => {
    setModalVisible(true);
  };
  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };

  const updateEnabled = (record, enabled) => {
    dispatch({
      type: 'adminUser/update',
      payload: {
        ...record,
        enabled
      },
      callback: () => {
        dispatch({
          type: 'adminUser/queryUsers',
          payload: { page, size, sort: 'id,desc' },
        });
      }
    });
  }

  const resetPassword = (record) => {
    if (record && record.id) {
      dispatch({
        type: 'adminUser/resetPassword',
        payload: {userId : record.id}
      });
    }
  }



  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
      width: '20%',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
      width: '20%',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      width: '20%',
      render: (_roles) => _roles?.map(e => roles.find(r => e === r.id)?.name || '').join(",")
    },
    {
      title: '创建时间',
      dataIndex: 'createdDate',
      width: '15%',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      width: '5%',
      render: (enabled) => enabled ? '正常' : '停用'
    },
    {
      title: '操作',
      key: 'opt',
      render: (_, record) => {
        return (
          <Space>
            {
              record?.enabled ? (<Button type='primary'
                                 size="small"
                                 loading={updateLoading}
                                 onClick={() => updateEnabled(record, false)}
                >停用</Button>) :
                (<Button type="default"
                         size="small"
                         loading={updateLoading}
                         onClick={() => updateEnabled(record, true)}
                >启用</Button>)
            }
            <Popconfirm
              title={`确认重置为初始密码?`}
              onConfirm={() => resetPassword(record)}
            >
              <Button type="primary"
                      size="small">
                重置密码
              </Button>
            </Popconfirm>
          </Space>

        );
      },
    },
  ];

  return (
    <Card
      title="用户管理"
      bordered={false}
      type="inner"
      extra={
        <Space>
          <Button type="primary" onClick={template} loading={downloadLoading}>
            下载模板
          </Button>
          <Button type="primary" onClick={handleShowModal}>
            导入用户
          </Button>
        </Space>
      }
    >
      <PublicTable
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
        pagination={{
          // 数据总数
          total,
          // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
          onChange: (_page, _pageSize) => {
            // 接口page是从0开始
            setPage(_page - 1);
            setSize(_pageSize);
          },
        }}
      />
      {modalVisible && (
        <UploadUserModal modalVisible={modalVisible} handleCancelModal={handleCancelModal} />
      )}
    </Card>
  );
};

export default connect(({ adminUser, loading }) => ({
  roles: adminUser.queryRolesData,
  dataSource: adminUser.queryUsersData.content,
  total: adminUser.queryUsersData.totalElements,
  loading: loading.effects['adminUser/queryUsers'],
  updateLoading: loading.effects['adminUser/update'],
  downloadLoading: loading.effects['adminUser/template'],
}))(UserTable);
