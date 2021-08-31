import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Space, Popconfirm, message } from 'antd';

const ConsultationTable = (props) => {
  const { dispatch, loading, buyLoading } = props;
  const { dataSource, total } = props;
  // 初始页数
  const [page, setPage] = useState(0);
  // 每页条数
  const [size, setSize] = useState(10);
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  useEffect(() => {
    if (classHourId) {
      // 查询第三方质询
      dispatch({
        type: 'studentConsultation/queryBankConsultations',
        payload: { classHourId, page, size },
      });
    }
  }, [page, size]);

  // 购买第三方质询
  const buyBankConsultation = (bankConsultationId, full) => {
    if ((classHourId && bankConsultationId) || full) {
      dispatch({
        type: 'studentConsultation/buyBankConsultation',
        payload: { classHourId, bankConsultationId, full },
      });
    }
  };

  // 关闭Pop
  const handleCancelPop = () => {
    message.error('已取消');
  };
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '批次号',
      dataIndex: 'bankConsultationId',
      key: 'bankConsultationId',
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
      key: 'buyStatusName',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, { buyStatus, bankConsultationId }) => {
        switch (buyStatus) {
          case 'NONE':
            return (
              <Space>
                <Popconfirm
                  title="确认购买?"
                  onConfirm={() => buyBankConsultation(bankConsultationId, false)}
                  onCancel={handleCancelPop}
                  okButtonProps={{ loading: buyLoading }}
                >
                  <Button type="primary" size="small">
                    购买提示咨询
                  </Button>
                </Popconfirm>
                <Popconfirm
                  title="确认购买?"
                  onConfirm={() => buyBankConsultation(bankConsultationId, true)}
                  onCancel={handleCancelPop}
                  okButtonProps={{ loading: buyLoading }}
                >
                  <Button type="primary" size="small">
                    购买完整咨询
                  </Button>
                </Popconfirm>
              </Space>
            );
          case 'HINT':
            return (
              <Popconfirm
                title="确认购买?"
                onConfirm={() => buyBankConsultation(bankConsultationId, true)}
                onCancel={handleCancelPop}
                okButtonProps={{ loading: buyLoading }}
              >
                <Button type="primary" size="small">
                  购买完整咨询
                </Button>
              </Popconfirm>
            );
          case 'FULL':
            return '已购买全部咨询';
          default:
            break;
        }
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
        // 数据总数
        total,
        // 页码或 pageSize 改变的回调，参数是改变后的页码及每页条数
        onChange: (page, pageSize) => {
          // 接口page是从0开始
          setPage(page - 1);
          setSize(pageSize);
        },
      }}
    />
  );
};

export default connect(({ studentConsultation, loading }) => ({
  dataSource: studentConsultation.queryBankConsultationsData.content,
  total: studentConsultation.queryBankConsultationsTotalElements,
  loading: loading.effects['studentConsultation/queryBankConsultations'],
  buyLoading: loading.effects['studentConsultation/buyBankConsultation'],
}))(ConsultationTable);
