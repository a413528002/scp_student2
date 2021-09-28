import React, { useEffect } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Popconfirm, Space } from 'antd';

const ConsultationTable = (props) => {
  const { dispatch, loading, buyLoading } = props;
  const { dataSource, total, isFirstPat } = props;

  const defaultPageSize = 3;

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 查询第三方咨询
  const queryBankConsultations = (page, size) => {
    dispatch({
      type: 'studentConsultation/queryBankConsultations',
      payload: { classHourId, page, size },
    });
  };

  // 查询错误详情
  const queryBankWrongs = (bankConsultationId) => {
    dispatch({
      type: 'studentConsultation/queryBankWrongs',
      payload: { classHourId, bankConsultationId },
    });
  };

  // 购买第三方咨询
  const buyBankConsultation = (bankConsultationId, full) => {
    if ((classHourId && bankConsultationId) || full) {
      dispatch({
        type: 'studentConsultation/buyBankConsultation',
        payload: { classHourId, bankConsultationId, full },
      });
    }
  };

  useEffect(() => {
    if (classHourId) {
      queryBankConsultations(0, defaultPageSize);
    }
  }, [classHourId]);

  const renderBuyButton = (buyStatus, bankConsultationId) => {
    return (
      <>
        <Popconfirm
          title="确认购买提示咨询?"
          onConfirm={() => buyBankConsultation(bankConsultationId, false)}
          okButtonProps={{ loading: buyLoading }}
          disabled={buyStatus !== 'NONE'}
        >
          <Button type="primary" size="small" disabled={buyStatus !== 'NONE'}>
            提示咨询
          </Button>
        </Popconfirm>

        <Popconfirm
          title="确认购买完整咨询?"
          onConfirm={() => buyBankConsultation(bankConsultationId, true)}
          okButtonProps={{ loading: buyLoading }}
          disabled={buyStatus === 'FULL'}
        >
          <Button type="primary" size="small" disabled={buyStatus === 'FULL'}>
            完整咨询
          </Button>
        </Popconfirm>
      </>
    );
  };

  const renderWrongs = (buyStatus, bankConsultationId) => {
    return (
      <Button
        type="primary"
        size="small"
        disabled={buyStatus === 'NONE'}
        onClick={() => queryBankWrongs(bankConsultationId)}
      >
        查看
      </Button>
    );
  };

  const columns = [
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '错误数量',
      dataIndex: 'errorCount',
      key: 'errorCount',
    },
    {
      title: '提示咨询费用',
      dataIndex: 'hintCost',
      key: 'hintCost',
    },
    {
      title: '完整咨询费用',
      dataIndex: 'fullCost',
      key: 'fullCost',
    },
    {
      title: '错账扣分',
      dataIndex: 'errorPoint',
      key: 'errorPoint',
    },
    {
      title: '购买方式',
      dataIndex: 'buyMethodName',
      key: 'buyMethodName',
    },
    {
      title: '已购买类别',
      dataIndex: 'buyStatusName',
    },
    {
      title: '操作',
      key: 'operation',
      render: (_, { buyStatus, bankConsultationId }, index) => {
        // 第一页第一条才能购买咨询
        if (isFirstPat && !index) {
          return (
            <Space>
              {renderBuyButton(buyStatus, bankConsultationId)}
              {renderWrongs(buyStatus, bankConsultationId)}
            </Space>
          );
        }
        return <Space>{renderWrongs(buyStatus, bankConsultationId)}</Space>;
      },
    },
  ];
  return (
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
      pagination={{
        defaultPageSize: defaultPageSize,
        // 数据总数
        total,
        // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
        onChange: (page, pageSize) => {
          queryBankConsultations(page - 1, pageSize);
        },
      }}
    />
  );
};

export default connect(({ studentConsultation, loading }) => ({
  dataSource: studentConsultation.queryBankConsultationsData.content,
  total: studentConsultation.queryBankConsultationsTotalElements,
  isFirstPat: studentConsultation.queryBankConsultationsIsFirstPage,
  loading: loading.effects['studentConsultation/queryBankConsultations'],
  buyLoading: loading.effects['studentConsultation/buyBankConsultation'],
}))(ConsultationTable);
