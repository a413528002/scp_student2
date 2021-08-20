import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Button, Card, Form, InputNumber, Popconfirm, Space } from 'antd';
import BrokeRule from '@/pages/student/finance/broke/BrokeRule';

const originData = [];
for (let i = 0; i < 8; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    bankName: '假数据-xxbank',
    amount: null,
    bankRegion: 'A',
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
  // 获取当前行编辑的焦点状态
  const inputRef = useRef(null);
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  const inputNode = <InputNumber ref={inputRef} min={0} />;
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

const BrokeTable = (props) => {
  const { dispatch, loading, saveLoading } = props;
  console.log(loading);
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
  };
  const applyForInject = async (bankExpenseId) => {
    try {
      const injectAmount = await form.validateFields();
      if (classHourId && bankExpenseId) {
        // 注资申请
        dispatch({
          type: 'studentOperation/applyForInject',
          payload: {
            classHourId,
            bankExpenseId,
            injectAmount,
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
        type: 'studentBroke/queryBankruptcies',
        payload: { classHourId },
      });
    }
  }, []);

  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '申请注入资金(万元)',
      dataIndex: 'injectAmount',
      key: 'injectAmount',
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
              onClick={() => applyForInject(record._key)}
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
            破产申请
          </Button>
        );
      },
    },
  ];
  // 表头
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
    <Card
      title="破产管理"
      bordered={false}
      type="inner"
    >
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
      <BrokeRule />
    </Card>
  );
};

export default connect(({ studentBroke, loading }) => ({
  dataSource: studentBroke.queryBankruptciesData,
  loading: loading.effects['studentBroke/queryBankruptcies'],
  saveLoading: loading.effects['studentOperation/applyForInject'],
}))(BrokeTable);
