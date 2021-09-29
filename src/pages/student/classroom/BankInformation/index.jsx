import React, { useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Descriptions, Empty, Input, message, Popconfirm, Space } from 'antd';
import NewBankModal from '@/pages/student/classroom/NewBankModal';

const BankInformation = (props) => {
  const { dispatch, classOpt, bankOpt, bankData } = props;
  const { searchLoading, joinLoading } = props;

  // 新建银行modal显示状态 ----start-----
  const [newBankModalVisible, setBankModalVisible] = useState(false);

  // 显示modal
  const handleNewBankShowModal = () => {
    setBankModalVisible(true);
  };

  // 关闭modal
  const handleNewBankCancelModal = () => {
    setBankModalVisible(false);
  };
  // 新建银行modal显示状态 ----end-----

  /**
   * 根据银行编码查询银行
   * @param code 输入的内容
   * @returns {boolean}
   */
  const onSearchQueryBankByCode = (code) => {
    if (code.trim()) {
      // 如果搜索的银行code与当前银行的code相同，直接返回提示信息，不进行搜索
      // if (bankCode === code) {
      //   message.warn('已加入该银行')
      //   return false
      // }
      dispatch({
        type: 'studentClassroom/queryBankByCode',
        payload: {
          code,
        },
      });
    } else {
      message.error('请输入银行编号');
    }
  };

  // 加入银行
  const joinBank = () => {
    dispatch({
      type: 'studentClassroom/joinBank',
    });
  };

  // 退出银行
  const exitBank = () => {
    dispatch({
      type: 'studentClassroom/exitBank',
    });
  };
  // 关闭pop
  const handleCancelExitBankPop = () => {
    message.error('已取消');
  };
  return (
    <Card
      title="银行信息"
      bordered={false}
      extra={
        <>
          <Space wrap>
            <Input.Group >
              <Input.Search
                allowClear
                enterButton="查询银行"
                placeholder="请输入银行编号"
                onSearch={onSearchQueryBankByCode}
                loading={searchLoading}
                disabled={!classOpt}
              />
            </Input.Group>
            <Button type="primary" onClick={joinBank} loading={joinLoading} disabled={!classOpt}>
              加入银行
            </Button>
            <Button type="primary" onClick={handleNewBankShowModal} disabled={!classOpt}>
              新建银行
            </Button>
            <Popconfirm
              title="确认退出银行"
              onConfirm={exitBank}
              onCancel={handleCancelExitBankPop}
              disabled={!bankOpt}
            >
              <Button disabled={!bankOpt}>退出银行</Button>
            </Popconfirm>
          </Space>
        </>
      }
      type="inner"
    >
      {bankData.bankId ? (
        <Descriptions column={2}>
          <Descriptions.Item label="银行编号">{bankData.bankCode}</Descriptions.Item>
          <Descriptions.Item label="银行行长">{bankData.presNickname}</Descriptions.Item>
          <Descriptions.Item label="银行名称">{bankData.bankName}</Descriptions.Item>
        </Descriptions>
      ) : (
        <Empty />
      )}
      {/* 新建银行modal */}
      <NewBankModal
        newBankModalVisible={newBankModalVisible}
        handleNewBankCancelModal={handleNewBankCancelModal}
      />
    </Card>
  );
};

export default connect(({ studentClassroom, loading }) => ({
  classOpt: studentClassroom.classOpt,
  bankOpt: studentClassroom.bankOpt,
  bankData: studentClassroom.bankData,
  searchLoading: loading.effects['studentClassroom/queryBankByCode'],
  joinLoading: loading.effects['studentClassroom/joinBank'],
}))(BankInformation);
