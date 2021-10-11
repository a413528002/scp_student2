import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Space, message } from 'antd';
import PublicTable from '@/components/Table';
import ManageFormModal from '@/pages/admin/classTemplate/manage/ManageFormModal';

const ManageTable = (props) => {
  const { dispatch, loading } = props;
  const { dataSource, total } = props;
  // modal状态
  const [modalVisible, setModalVisible] = useState(false);
  // modal内容
  const [typeModal, setTypeModal] = useState({});

  /**
   * 显示modal
   * @param type 操作类型 CREATE:新增 UPDATE:修改
   * @param record 修改时当前行的数据
   */
  const handleShowModal = (type, record) => {
    if (type === 'CREATE') {
      setTypeModal({ type, title: '新增' });
    } else if (type === 'UPDATE') {
      setTypeModal({ type, title: '修改', record });
    }
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };

  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);

  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminManage/queryClassTemplates',
      payload: { page, size, sort: 'id,desc' },
    });
  }, []);

  const columns = [
    {
      title: '名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '备注',
      dataIndex: 'memo',
      key: 'memo',
    },
    {
      title: '状态',
      dataIndex: 'enabled',
      key: 'enabled',
      render: (enabled) => {
        switch (enabled) {
          case true:
            return '启用';
          case false:
            return '停用';
          default:
            break;
        }
      },
    },

    {
      title: '操作',
      key: 'opt',
      fixed: 'right',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => handleShowModal('UPDATE', record)}>
              修改
            </Button>
            {record?.enabled ? (
              <Button type="primary" size="small" onClick={() => message.error('暂不支持操作')}>
                停用
              </Button>
            ) : (
              <Button type="default" size="small" onClick={() => message.error('暂不支持操作')}>
                启用
              </Button>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <Card
      title="模板管理"
      bordered={false}
      type="inner"
      extra={
        <Button type="primary" onClick={() => handleShowModal('CREATE')}>
          新增
        </Button>
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
        <ManageFormModal
          modalVisible={modalVisible}
          handleCancelModal={handleCancelModal}
          typeModal={typeModal}
        />
      )}
    </Card>
  );
};

export default connect(({ adminManage, loading }) => ({
  dataSource: adminManage.queryClassTemplatesData?.content,
  total: adminManage.queryClassTemplatesData?.totalElements,
  loading: loading.effects['adminManage/queryClassTemplates'],
}))(ManageTable);
