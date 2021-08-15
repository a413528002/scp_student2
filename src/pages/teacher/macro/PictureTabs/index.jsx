import React, {useState} from 'react';
import {Button, Card, Image, Empty} from 'antd';
import UploadPictureModal from "@/pages/teacher/macro/UploadPictureModal";

const PictureTabs = () => {
  const [modalVisible, setModalVisible] = useState(false)
  const [activeTabKey, setActiveTabKey] = useState('rate')
  // 请求到的数据
  const srcBea64 = undefined
  // src url "https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
  // 显示uploadModal
  const handleShowModal = () => {
    setModalVisible(true);
  };
  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // tabs切换
  const onTabChange = (key,) => {
    setActiveTabKey(key);
  };
  const tabList = [
    {
      key: 'rate',
      tab: '存贷款利率',
    },
    {
      key: 'total',
      tab: '存贷款总量',
    },
    {
      key: 'single',
      tab: '存贷款单量',
    },
    {
      key: 'risk',
      tab: '信用风险',
    },
    {
      key: 'financing',
      tab: '投融资市场',
    },
    {
      key: 'bond',
      tab: '债券市场',
    },
  ];
  const contentImage = srcBea64 ? <Image
    width={'100%'}
    src={srcBea64}
  /> : <Empty/>

  const contentList = {
    rate: contentImage,
    total: contentImage,
    single: contentImage,
    risk: contentImage,
    financing: contentImage,
    bond: contentImage,
  };
  return (
    <>
      <Card
        style={{width: '100%'}}
        tabBarExtraContent={<Button type="primary" onClick={handleShowModal}>上传</Button>}
        tabList={tabList}
        activeTabKey={activeTabKey}
        onTabChange={key => {
          onTabChange(key);
        }}
      >
        {contentList[activeTabKey]}
      </Card>
      {
        modalVisible && <UploadPictureModal
          modalVisible={modalVisible}
          handleCancelModal={handleCancelModal}
        />
      }
    </>
  );
};

export default PictureTabs;
