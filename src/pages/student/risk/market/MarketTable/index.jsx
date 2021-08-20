import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Card, Form, InputNumber, Popconfirm, Space } from 'antd';
import MarketRule from '@/pages/student/risk/market/MarketRule';

const originData = [];
for (let i = 0; i < 8; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    bizTypeName: '假数据-bizTypeName',
    rateTypeName: 'A',
    amount: 120000,
    loanAmount: 120000,
    depositAmount: 120000,
    status: true,
  });
}
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
  const { dataSource } = props;
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
      if (classHourId && bankRwaMarketId) {
        // 保存市场风险
        dispatch({
          type: 'studentCredit/updateBankRwaMarket',
          payload: {
            classHourId,
            bankRwaMarketId,
            ...values,
          },
          callback: () => setEditingKey(''),
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  useEffect(() => {
    if (classHourId) {
      // 查询列表
      dispatch({
        type: 'studentMarket/queryBankRwaMarkets',
        payload: { classHourId },
      });
    }
  }, []);
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '所属期数',
      dataIndex: 'term',
      key: 'term',
    },
    {
      title: '贷款总额(万元)',
      dataIndex: 'loanAmount',
      key: 'loanAmount',
      render: (loanAmount) => `${loanAmount / 10000}`,
    },
    {
      title: '存款总额(万元)',
      dataIndex: 'depositAmount',
      key: 'depositAmount',
      render: (depositAmount) => `${depositAmount / 10000}`,
    },
    {
      title: '利率敏感性缺口',
      dataIndex: 'gap',
      key: 'gap',
      editable: true,
    },
    {
      title: '市场风险系数',
      dataIndex: 'marketRate',
      key: 'marketRate',
      editable: true,
    },
    {
      title: '风险小计',
      dataIndex: 'address',
      key: 'address',
      editable: true,
    },
    {
      title: '操作',
      dataIndex: '_key',
      key: '_key',
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
          <Button
            type="primary"
            size="small"
            disabled={editingKey !== ''}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
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
  return (
    <Card title="市场风险" bordered={false} type="inner">
      {/*表单提交*/}
      <Form form={form} component={false}>
        <PublicTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          // dataSource={dataSource}
          dataSource={originData}
          columns={columnsData}
          loading={loading}
          bordered
        />
      </Form>
      <MarketRule />
    </Card>
  );
};

export default connect(({ studentMarket, loading }) => ({
  dataSource: studentMarket.queryBankRwaMarketsData,
  loading: loading.effects['studentMarket/queryBankRwaMarkets'],
}))(MarketTable);
