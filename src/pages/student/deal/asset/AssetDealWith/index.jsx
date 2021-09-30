import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import Tags from '@/components/Tags';
import Million from '@/components/Million';
import PublicTable from '@/components/Table';
import { Button, Space } from 'antd';
import ProvisionOrPrepareModal from '@/pages/student/deal/components/provisionOrPrepareModal';

const AssetDealWith = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询当前期间不良资产
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentAsset/queryCurBankBadAssets',
        payload: { classHourId },
      });
    }
  }, []);

  // modal显示状态 ----start-----
  const [modalVisible, setModalVisible] = useState(false);
  const [typeModal, setTypeModal] = useState({});
  // 显示modal
  const handleShowModal = (type, bankFinancialBusinessId) => {
    if (type === 'L') {
      setTypeModal({ type, title: '清收', bankFinancialBusinessId });
    } else if (type === 'S') {
      setTypeModal({ type, title: '变卖', bankFinancialBusinessId });
    }
    setModalVisible(true);
  };

  // 关闭modal
  const handleCancelModal = () => {
    setModalVisible(false);
  };
  // modal显示状态 ----end-----

  const columns = [
    {
      title: '所属期数',
      dataIndex: 'businessPeriod',
      render: (businessPeriod) => `第${businessPeriod}期`,
    },
    {
      title: '处置期间',
      dataIndex: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '贷款金额(万元)',
      dataIndex: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '业务类型',
      dataIndex: 'loanTypeName',
      render: (loanTypeName) => <Tags>{loanTypeName}</Tags>,
    },
    {
      title: '抵押/担保金额(万元)',
      dataIndex: 'mgMoney',
      render: (mgMoney) => <Million>{mgMoney}</Million>,
    },
    {
      title: '信用评级',
      dataIndex: 'creditRating',
    },
    {
      title: '处置状态',
      dataIndex: 'disposalTypeName',
      render: (disposalTypeName, { isNew }) => {
        switch (isNew) {
          case true:
            return <Tags>未处置</Tags>;
          default:
            return <Tags>{disposalTypeName}</Tags>;
        }
      },
    },
    {
      title: '回收金额(万元)',
      dataIndex: 'returnAmount',
      render: (returnAmount) => <Million>{returnAmount}</Million>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      render: (_, { bankFinancialBusinessId }) => {
        return (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => handleShowModal('L', bankFinancialBusinessId)}
            >
              清收
            </Button>
            <Button
              type="primary"
              size="small"
              onClick={() => handleShowModal('S', bankFinancialBusinessId)}
            >
              变卖
            </Button>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <PublicTable dataSource={dataSource} columns={columns} bordered loading={loading} />
      <ProvisionOrPrepareModal
        modalVisible={modalVisible}
        handleCancelModal={handleCancelModal}
        typeModal={typeModal}
      />
    </>
  );
};

export default connect(({ studentAsset, loading }) => ({
  dataSource: studentAsset.queryCurBankBadAssetsData,
  loading: loading.effects['studentAsset/queryCurBankBadAssets'],
}))(AssetDealWith);
