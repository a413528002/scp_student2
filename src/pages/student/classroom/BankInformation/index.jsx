import React, {useState} from 'react';
import {connect} from "umi";
import {Button, Card, Input, Space, Descriptions, Empty, Popconfirm, message} from 'antd';
import NewBankModal from "@/pages/student/classroom/NewBankModal";

const {Search} = Input;
const BankInformation = (props) => {
  const {bankInInfoData, dispatch, studentInClassData} = props;
  const {searchLoading, joinLoading} = props;

  // 获取当前银行信息
  const BANK_IN_INFO = !!localStorage.getItem('BANK_IN_INFO')

  // 获取当前银行信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {
    bankCode,
    bankName,
    presNickname,
    bankId
  } = bankInInfoData !== undefined ? bankInInfoData : JSON.parse(localStorage.getItem('BANK_IN_INFO')) || {}
// 获取当前的课堂信息 redux中的studentInClassData不存在 拿localStorage里面的
  const {classHourId} = studentInClassData !== undefined ? studentInClassData : JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
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
  const onSearchQueryBankByCode = code => {
    if (code.trim()) {
      // 如果搜索的银行code与当前银行的code相同，直接返回提示信息，不进行搜索
      if (bankCode === code) {
        message.warn('已加入该银行')
        return false
      }
      dispatch({
        type: 'studentClassroom/queryBankByCode',
        payload: {
          code
        }
      })
    } else {
      message.error('搜索内容不能为空')
    }
  };

  // 加入银行
  const joinBank = () => {
    dispatch({
      type: 'studentClassroom/joinBank',
      payload: {
        classHourId,
        bankId,
      }
    })
  }

  // 退出银行
  const exitBank = () => {
    dispatch({
      type: 'studentClassroom/exitBank',
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
              onSearch={onSearchQueryBankByCode}
              style={{width: 300}}
              enterButton="查询银行"
              loading={searchLoading}
              allowClear
            />
            <Button type="primary" onClick={joinBank} loading={joinLoading}>加入银行</Button>
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
            <Descriptions.Item label="银行行长">{presNickname}</Descriptions.Item>
            <Descriptions.Item label="银行名称">{bankName}</Descriptions.Item>
          </Descriptions>
        ) : <Empty/>
      }
      {/*新建银行modal*/}
      <NewBankModal
        newBankModalVisible={newBankModalVisible}
        handleNewBankCancelModal={handleNewBankCancelModal}
      />
    </Card>
  );
}

export default connect(({studentClassroom, loading}) => ({
  bankInInfoData: studentClassroom.studentClassroomBankInInfoData,
  studentInClassData: studentClassroom.studentClassroomStudentInClassData,
  searchLoading: loading.effects['studentClassroom/queryBankByCode'],
  joinLoading: loading.effects['studentClassroom/joinBank'],
}))(BankInformation)
