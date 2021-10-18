import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Descriptions, Card, Avatar, Image, Button } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import TenantDrawer from '@/pages/admin/tenant/TenantDrawer';

const TenantTable = (props) => {
  const { dispatch, loading } = props;
  const {
    currentTenantData: { tenantId, tenantName, tenantLogoBase64 },
  } = props;

  // 查询当前租户
  useEffect(() => {
    dispatch({
      type: 'adminTenant/queryCurrentTenant',
    });
  }, []);

  // Drawer状态
  const [drawerVisible, setDrawerVisible] = useState(false);

  /**
   * 显示modal
   */
  const handleShowDrawer = () => {
    setDrawerVisible(true);
  };

  // 关闭Drawer
  const handleCancelDrawer = () => {
    setDrawerVisible(false);
  };

  return (
    <Card
      title="租户管理"
      type="inner"
      bordered={false}
      loading={loading}
      extra={
        <Button type="primary" onClick={handleShowDrawer}>
          修改
        </Button>
      }
    >
      <Descriptions column={1}>
        <Descriptions.Item label="租户ID">{tenantId}</Descriptions.Item>
        <Descriptions.Item label="租户名称">{tenantName}</Descriptions.Item>
        <Descriptions.Item label="LOGO">
          <Avatar
            src={
              <Image
                src={`data:image/svg+xml;base64,${tenantLogoBase64}`}
                fallback={<UserOutlined />}
              />
            }
          />
        </Descriptions.Item>
      </Descriptions>
      {drawerVisible && (
        <TenantDrawer drawerVisible={drawerVisible} handleCancelDrawer={handleCancelDrawer} />
      )}
    </Card>
  );
};

export default connect(({ adminTenant, loading }) => ({
  currentTenantData: adminTenant.queryCurrentTenantData,
  loading: loading.effects['adminTenant/queryCurrentTenant'],
}))(TenantTable);
