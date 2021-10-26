import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import Million from '@/components/Million';
import { Button, Space, Popconfirm, message } from 'antd';
import PublicTable from '@/components/Table';
import CreditorsMngModal from '@/pages/student/financial/creditorsMng/CreditorsMngModal';
import { toPercent } from '@/utils/commonUtils';

const CreditorsMngTable = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询债券
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentCreditorsMng/queryDebts',
        payload: { classHourId },
      });
    }
  }, []);

  /**
   * 卖出债券
   * @param bankFinancialBusinessId id
   */
  const sellDebt = (bankFinancialBusinessId) => {
    if (classHourId && bankFinancialBusinessId) {
      dispatch({
        type: 'studentCreditorsMng/sellDebt',
        payload: { classHourId, bankFinancialBusinessId },
      });
    }
  };

  /**
   * 查询债券利息
   * @param bankFinancialBusinessId id
   */
  const queryDepositInterests = (bankFinancialBusinessId) => {
    if (classHourId && bankFinancialBusinessId) {
      dispatch({
        type: 'studentCreditorsMng/queryDepositInterests',
        payload: { classHourId, bankFinancialBusinessId },
      });
    }
  };

  // 利息结算modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);

  // 显示modal
  const handleShowModal = (id) => {
    queryDepositInterests(id);
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // 利息结算modal显示状态 ----end-----

  // 关闭Pop
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'notation',
      key: 'notation',
      render: (text, record, index) => `${index + 1}`,
    },
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'customerTypeName',
      key: 'customerTypeName',
    },
    {
      title: '区域',
      dataIndex: 'regionName',
      key: 'regionName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },

    {
      title: '预计收益率(%)',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => toPercent(expectRate),
    },
    {
      title: '期限',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '利息',
      dataIndex: 'interest',
      key: 'interest',
      render: (_, { bankFinancialBusinessId, ended }) => {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handleShowModal(bankFinancialBusinessId)}
            >
              计息
            </Button>
            {!ended && (
              <Popconfirm
                title="确认卖出?"
                onConfirm={() => sellDebt(bankFinancialBusinessId)}
                onCancel={handleCancelPop}
              >
                <Button type="primary" size="small">
                  卖出
                </Button>
              </Popconfirm>
            )}
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
      {modalVisible && (
        <CreditorsMngModal modalVisible={modalVisible} handleCancelModal={handleCancelModal} />
      )}
    </>
  );
};

export default connect(({ studentCreditorsMng, loading }) => ({
  dataSource: studentCreditorsMng.queryDebtsData,
  loading: loading.effects['studentCreditorsMng/queryDebts'],
}))(CreditorsMngTable);
