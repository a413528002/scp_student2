import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Empty, Form, InputNumber, Popconfirm, Space } from 'antd';
import Million from '@/components/Million';
import { toPercent, yuan } from '@/utils/commonUtils';
import Radios from '@/components/Radios';
import styles from '@/pages/student/risk/market/index.less';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = <InputNumber min={0} />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `请输入${title}`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const MarketTable = (props) => {
  const { dispatch, loading, saveLoading } = props;
  const {
    queryBankRwaMarketsData: { bankRwaMarkets: dataSource, period, periodCur, periodTtl },
  } = props;
  const [form] = Form.useForm();
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  // 当前编辑row key
  const [editingKey, setEditingKey] = useState('');
  // 是否可编辑
  const isEditing = (record) => record._key === editingKey;
  // 编辑
  const handleEdit = (record) => {
    form.setFieldsValue({
      ...record,
      gap: record.gap / 10000,
      totalRisk: record.totalRisk / 10000,
    });
    setEditingKey(record._key);
  };
  // 取消编辑pop
  const handleCancelPop = () => {
    setEditingKey('');
    form.resetFields();
  };

  const updateBankRwaMarket = async (bankRwaMarketId) => {
    try {
      const values = await form.validateFields();
      if (values && classHourId && bankRwaMarketId) {
        const params = yuan(values);
        // 保存市场风险
        dispatch({
          type: 'studentMarket/updateBankRwaMarket',
          payload: {
            classHourId,
            bankRwaMarketId,
            ...params,
            marketRate: values.marketRate, // 覆盖转换后的marketRate
          },
          callback: () => setEditingKey(''),
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // 是否可以编辑
  const [editForm, setEditForm] = useState(true);
  /**
   * 查询列表
   * @param classHourId 课堂id
   * @param period 期数
   */
  const queryBankRwaMarkets = (classHourId, period) => {
    dispatch({
      type: 'studentMarket/queryBankRwaMarkets',
      payload: { classHourId, period },
    });
  };
  useEffect(() => {
    if (classHourId) {
      queryBankRwaMarkets(classHourId);
    }
  }, []);
  // 切换期数
  const onRadioChange = (e) => {
    const period = e.target.value;
    // 当期才能显示操作按钮
    setEditForm(period === periodCur);
    queryBankRwaMarkets(classHourId, period);
  };
  const columns = [
    {
      title: '所属期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '剩余期限',
      dataIndex: 'surplusTerm',
      key: 'surplusTerm',
    },
    {
      title: '贷款总额(万元)',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (loanAmount) => <Million>{loanAmount}</Million>,
    },
    {
      title: '存款总额(万元)',
      dataIndex: 'depositAmount',
      key: 'depositAmount',
      render: (depositAmount) => <Million>{depositAmount}</Million>,
    },
    {
      title: '利率敏感性缺口',
      dataIndex: 'gap',
      key: 'gap',
      editable: true,
      render: (gap) => <Million>{gap}</Million>,
    },
    {
      title: '市场风险系数',
      dataIndex: 'marketRate',
      key: 'marketRate',
      editable: true,
      render: (marketRate) => toPercent(marketRate),
    },
    {
      title: '风险小计',
      dataIndex: 'totalRisk',
      key: 'totalRisk',
      editable: true,
      render: (totalRisk) => <Million>{totalRisk}</Million>,
    },
    {
      title: '操作',
      dataIndex: '_key',
      key: '_key',
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => updateBankRwaMarket(record._key)}
              loading={saveLoading}
            >
              保存
            </Button>
            <Popconfirm title="确认取消?" onConfirm={handleCancelPop}>
              <Button type="link" size="small">
                取消
              </Button>
            </Popconfirm>
          </Space>
        ) : (
          editForm && (
            <Button
              type="primary"
              size="small"
              disabled={editingKey !== ''}
              onClick={() => handleEdit(record)}
            >
              编辑
            </Button>
          )
        );
      },
    },
  ];
  const columnsData = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex,
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });
  return periodTtl ? (
    <>
      <div className={styles.choose}>
        <Radios
          period={period}
          periodCur={periodCur}
          periodTtl={periodTtl}
          onRadioChange={onRadioChange}
        />
      </div>
      {/* 表单提交 */}
      <Form form={form} component={false}>
        <PublicTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          dataSource={dataSource}
          columns={columnsData}
          loading={loading}
          bordered
        />
      </Form>
    </>
  ) : (
    <Empty />
  );
};

export default connect(({ studentMarket, loading }) => ({
  queryBankRwaMarketsData: studentMarket.queryBankRwaMarketsData,
  loading: loading.effects['studentMarket/queryBankRwaMarkets'],
}))(MarketTable);
