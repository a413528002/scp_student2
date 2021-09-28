import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';
import { Button, message, Popconfirm, Radio } from 'antd';
import Tags from '@/components/Tags';
import styles from '@/pages/student/finance/certificate/index.less';

const CertificateTable = (props) => {
  const { dispatch, loading } = props;
  const {
    dataSource,
    queryBankOriginalCertificatesData: { period, periodCur, periodTtl },
  } = props;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 是否可以编辑操作
  const [editForm, setEditForm] = useState(true);

  /**
   * 查询原始凭证
   * @param classHourId 课堂id
   * @param period 期数
   */
  const queryBankOriginalCertificates = (classHourId, period) => {
    dispatch({
      type: 'studentCertificate/queryBankOriginalCertificates',
      payload: { classHourId, period },
    });
  };

  // 查询原始凭证
  useEffect(() => {
    if (classHourId) {
      queryBankOriginalCertificates(classHourId);
    }
  }, []);

  // 切换期数
  const onRadioChange = (e) => {
    const period = e.target.value;
    // 当期才能显示操作按钮
    setEditForm(period === periodCur);
    queryBankOriginalCertificates(classHourId, period);
  };

  // 取消编辑pop
  const handleCancelPop = () => {
    message.error('已取消');
  };
  const columns = [
    {
      title: '所属期数',
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
        editForm && voucherFlag === false ? (
          <Popconfirm
            title="确认记账"
            onConfirm={() => message.error('暂不支持记账')}
            onCancel={handleCancelPop}
          >
            <Button type="primary" size="small">
              记账
            </Button>
          </Popconfirm>
        ) : null,
    },
  ];
  return (
    <>
      <div className={styles.choose}>
        <Radio.Group value={period} onChange={onRadioChange} buttonStyle="solid">
          {Array(periodTtl)
            .fill()
            .map((e, i) => i + 1)
            .map((e) => (
              <Radio.Button disabled={e > periodCur} key={e} value={e}>
                第{e}期
              </Radio.Button>
            ))}
        </Radio.Group>
      </div>
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
    </>
  );
};

export default connect(({ studentCertificate, loading }) => ({
  dataSource: studentCertificate.queryBankOriginalCertificatesData.bankOriginalCertificates,
  queryBankOriginalCertificatesData: studentCertificate.queryBankOriginalCertificatesData,
  loading: loading.effects['studentCertificate/queryBankOriginalCertificates'],
}))(CertificateTable);
