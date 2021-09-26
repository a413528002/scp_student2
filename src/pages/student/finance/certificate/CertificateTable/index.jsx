import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';
import { Button, message, Popconfirm } from 'antd';
import Tags from "@/components/Tags";

const CertificateTable = (props) => {
  const { dispatch, loading } = props;
  const { dataSource } = props;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询原始凭证
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentCertificate/queryBankOriginalCertificates',
        payload: { classHourId },
      });
    }
  }, []);

  // 取消编辑pop
  const handleCancelPop = () => {
    message.error('已取消');
  };
  const columns = [
    {
      title: '期间',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'transCode',
      key: 'transCode',
    },
    {
      title: '业务说明',
      dataIndex: 'transCodeName',
      key: 'transCodeName',
    },
    {
      title: '交易本金(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '交易利息(万元)',
      dataIndex: 'interest',
      key: 'interest',
      render: (interest) => <Million>{interest}</Million>,
    },
    {
      title: '状态',
      dataIndex: 'voucherFlag',
      key: 'voucherFlag',
      render: (interest) => {
        switch (interest) {
          case true:
            return <Tags>{'已记账'}</Tags>;
          case false:
            return <Tags>{'未记账'}</Tags>;
          default:
            break;
        }
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, { voucherFlag }) =>
        voucherFlag === false ? (
          // <Popconfirm title="确认记账" onConfirm={() => console.log(1)} onCancel={handleCancelPop}>
            <Button type="primary" size="small">
              记账
            </Button>
          // </Popconfirm>
        ) : null,
    },
  ];
  return <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />;
};

export default connect(({ studentCertificate, loading }) => ({
  dataSource: studentCertificate.queryBankOriginalCertificatesData,
  loading: loading.effects['studentCertificate/queryBankOriginalCertificates'],
}))(CertificateTable);
