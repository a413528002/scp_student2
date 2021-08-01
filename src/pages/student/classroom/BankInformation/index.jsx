import React, {useState} from 'react';
import {connect} from "umi";
import {Button, Card, Input, Space, Descriptions, Empty, Popconfirm} from 'antd';
import NewBankModal from "@/pages/student/classroom/NewBankModal";

const {Search} = Input;
const BankInformation = (props) => {
  const {bankInInfoData, dispatch, studentInClassData} = props;

  // 获取当前银行信息
  const BANK_IN_INFO = !!localStorage.getItem('BANK_IN_INFO')

  // 获取当前银行信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {
    bankCode,
    bankName,
  } = bankInInfoData !== undefined ? bankInInfoData : JSON.parse(localStorage.getItem('BANK_IN_INFO')) || {}

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
  const onSearch = value => console.log(value);

  // 获取当前的课堂信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {classHourId} = studentInClassData !== undefined ? studentInClassData : JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  // 退出银行
  const exitBank = () => {
    dispatch({
      type: 'classroom/exitBank',
      payload: {classHourId}
    })
  }
  // 关闭pop
  const handleCancelExitBankPop = () => {
    message.error('已取消')
  }
  return (
    <Card
      title="银行信息"
      bordered={false}
      extra={
        <>
          <Space>
            <Search
              placeholder="请输入银行编号"
              onSearch={onSearch}
              style={{width: 300}}
              enterButton="查询银行"
            />

            <Button type="primary">加入银行</Button>
            <Button type="primary" onClick={handleNewBankShowModal}>新建银行</Button>
            <Popconfirm
              title="确认退出银行"
              onConfirm={exitBank}
              onCancel={handleCancelExitBankPop}
            >
              <Button>退出银行</Button>
            </Popconfirm>
          </Space>
        </>
      }
      type='inner'
    >
      {
        BANK_IN_INFO && BANK_IN_INFO === true ? (
          <Descriptions column={2}>
            <Descriptions.Item label="银行编号">{bankCode}</Descriptions.Item>
            <Descriptions.Item label="银行行长">{}</Descriptions.Item>
            <Descriptions.Item label="银行名称">{bankName}</Descriptions.Item>
          </Descriptions>
        ) : <Empty/>
      }

      <NewBankModal
        newBankModalVisible={newBankModalVisible}
        handleNewBankCancelModal={handleNewBankCancelModal}
      />
    </Card>
  );
}

export default connect(({classroom}) => ({
  bankInInfoData: classroom.classroomBankInInfoData,
  studentInClassData: classroom.classroomStudentInClassData,
}))(BankInformation)
