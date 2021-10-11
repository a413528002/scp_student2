import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Button, message, Space, Select, Popconfirm } from 'antd';
import PublicTable from '@/components/Table';
import styles from '@/pages/admin/classTemplate/financial/index.less';
import BizType from '@/components/BizType';
import Million from '@/components/Million';
import { toPercent } from '@/utils/commonUtils';

const FinancialTable = (props) => {
  const { dispatch, deleteLoading, loading } = props;
  const { querySelectData, classTemplateId, dataSource } = props;

  // 查询课堂模板
  useEffect(() => {
    dispatch({
      type: 'adminFinancial/queryFMClassTemplates',
    });
  }, []);

  /**
   * 删除课堂模板-金融数据
   * @param classTemplateFinancialMarketId id
   */
  const deleteClassTemplateFinancialMarket = (classTemplateFinancialMarketId) => {
    if (classTemplateFinancialMarketId) {
      dispatch({
        type: 'adminFinancial/deleteClassTemplateFinancialMarket',
        payload: { classTemplateFinancialMarketId },
      });
    }
  };

  /**
   * 下拉框切换
   * @param classTemplateId 课堂模板id
   */
  const handleChangeSelectOption = (classTemplateId) => {
    dispatch({
      type: 'adminFinancial/queryClassTemplateFinancialMarkets',
      payload: { classTemplateId },
    });
  };

  /**
   * selectOption OPTIONS
   */
  const selectOption = querySelectData.map((d) => (
    <Select.Option value={d.id} key={d.id}>
      {d.name}
    </Select.Option>
  ));
  const handleCancelPop = () => {
    message.error('已取消');
  };

  const columns = [
    {
      title: '序号',
      dataIndex: 'orderNo',
      key: 'orderNo',
    },
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '业务类型',
      dataIndex: 'bizType',
      key: 'bizType',
      render: (bizType) => <BizType>{bizType}</BizType>,
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '期限',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '利率类型',
      dataIndex: 'rateType',
      key: 'rateType',
    },
    {
      title: '期望利率',
      dataIndex: 'expectRate',
      key: 'expectRate',
      render: (expectRate) => toPercent(expectRate),
    },
    {
      title: '存贷客户类型',
      dataIndex: 'customerType',
      key: 'customerType',
    },
    {
      title: '贷款分类',
      dataIndex: 'loanType',
      key: 'loanType',
    },
    {
      title: '质押或担保金额',
      dataIndex: 'number',
      key: 'number',
    },
    {
      title: '贷款信用评级',
      dataIndex: 'creditRating',
      key: 'creditRating',
    },
    {
      title: '债券分类',
      dataIndex: 'debtType',
      key: 'debtType',
    },
    {
      title: '渠道代码',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '区域',
      dataIndex: 'region',
      key: 'region',
    },
    {
      title: '操作',
      key: 'opt',
      render: (_, record) => {
        return (
          <Space>
            <Button type="primary" size="small" onClick={() => message.error('暂不支持操作')}>
              修改
            </Button>
            <Popconfirm
              title="确认删除?"
              onConfirm={() => deleteClassTemplateFinancialMarket(record.id)}
              onCancel={handleCancelPop}
            >
              <Button type="primary" size="small" loading={deleteLoading}>
                删除
              </Button>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];
  return (
    <>
      <div className={styles.choose}>
        {/* 选择框 */}
        <Select value={classTemplateId} onChange={handleChangeSelectOption} style={{ width: 120 }}>
          {selectOption}
        </Select>
        <Button type="primary" onClick={() => message.error('暂不支持操作')}>
          新增
        </Button>
      </div>

      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
    </>
  );
};

export default connect(({ adminFinancial, loading }) => ({
  querySelectData: adminFinancial.queryFMClassTemplatesData,
  classTemplateId: adminFinancial.classTemplateId,
  dataSource: adminFinancial.queryClassTemplatesData,
  loading: loading.effects['adminFinancial/queryClassTemplateFinancialMarkets'],
  deleteLoading: loading.effects['adminFinancial/deleteClassTemplateFinancialMarket'],
}))(FinancialTable);
