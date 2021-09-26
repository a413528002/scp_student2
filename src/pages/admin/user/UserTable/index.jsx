import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Space, Switch } from 'antd';
import PublicTable from '@/components/Table';
import UploadUserModal from '@/pages/admin/user/UploadUserModal';

const UserTable = (props) => {
  const { dispatch, loading, updateLoading, downloadLoading } = props;
  const { dataSource, total } = props;
  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);
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

  const updateEnabled = (record, e) => {
    dispatch({
      type: 'adminUser/update',
      payload: {
        ...record,
        enabled: e
      },
      callback: () => {
        dispatch({
          type: 'adminUser/queryUsers',
          payload: { page, size, sort: 'id,desc' },
        });
      }
    });
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '用户昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '租户ID',
      dataIndex: 'tenantId',
      key: 'tenantId',
    },
    {
      title: '权限集合',
      dataIndex: 'roles',
      key: 'roles',
    },
    {
      title: '启用',
      dataIndex: 'enabled',
      render: (text, record) => {
        return <Switch
          checkedChildren="ON"
          unCheckedChildren="OFF"
          onChange={e => updateEnabled(record, e)}
          checked={text ? true : false}
          loading={updateLoading}
        />
      }
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
          onChange: (page, pageSize) => {
            // 接口page是从0开始
            setPage(page - 1);
            setSize(pageSize);
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
  dataSource: adminUser.queryUsersData.content,
  total: adminUser.queryUsersData.totalElements,
  loading: loading.effects['adminUser/queryUsers'],
  updateLoading: loading.effects['adminUser/update'],
  downloadLoading: loading.effects['adminUser/template'],
}))(UserTable);
