import React, {useEffect, useState} from 'react';
import {connect} from "umi";
import PublicTable from "@/components/Table";
import {Button, Card, Space} from "antd";
import LicenseActivateCodeModal from "@/pages/admin/license/LicenseActivateCodeModal";
import LicenseGenerateCodeModal from "@/pages/admin/license/LicenseGenerateCodeModal";

const LicenseTable = (props) => {
  const {dispatch, loading} = props;
  const {dataSource} = props;
  // 查询LICENSE
  useEffect(() => {
    dispatch({
      type: 'adminLicense/queryLicenseContent',
    })
  }, [])

  // 激活码modal
  const [activateModalVisible, setActivateModalVisible] = useState(false)

  // 申请码modal
  const [generateModalVisible, setGenerateModalVisible] = useState(false)

  // 显示激活码modal
  const handleShowActivateModal = () => {
    setActivateModalVisible(true);
  };

  // 显示申请码modal
  const handleShowGenerateModal = () => {
    setGenerateModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setActivateModalVisible(false);
    setGenerateModalVisible(false);
  };

  const columns = [
    {
      title: 'LICENSE',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '状态',
      dataIndex: 'name',
      key: 'name',
    },
  ];
  return (
    <Card
      title="LICENSE"
      bordered={false}
      type="inner"
      extra={
        <Space>
          <Button type="primary" onClick={handleShowGenerateModal}>
            获取申请码
          </Button>
          <Button type="primary" onClick={handleShowActivateModal}>
            激活
          </Button>
        </Space>
      }
    >
      <PublicTable
        showHeader = {false}
        dataSource={dataSource}
        columns={columns}
        loading={loading}
        bordered
        pagination={false}
      />
      {
        activateModalVisible &&
        <LicenseActivateCodeModal activateModalVisible={activateModalVisible} handleCancelModal={handleCancelModal}/>
      }
      {
        generateModalVisible &&
        <LicenseGenerateCodeModal generateModalVisible={generateModalVisible} handleCancelModal={handleCancelModal}/>
      }

    </Card>
  );
};

export default connect(({adminLicense, loading}) => ({
  dataSource: adminLicense.queryLicenseContentData,
  loading: loading.effects['adminLicense/queryLicenseContent']
}))(LicenseTable);
