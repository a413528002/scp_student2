import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Form, InputNumber, Popconfirm, Space, Tag } from 'antd';
import PublicTable from '@/components/Table';
import HandleRule from '@/pages/student/risk/handle/HandleRule';

const originData = [];
for (let i = 0; i < 8; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    bizTypeName: '假数据-bizTypeName',
    rateTypeName: 'A',
    amount: 120000,
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

const HandleTable = (props) => {
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
  };

  const updateBankRwaOperational = async (bankRwaOperationalId) => {
    try {
      const totalRisk = await form.validateFields();
      if (classHourId && bankRwaOperationalId) {
        // 保存操作风险
        dispatch({
          type: 'studentHandle/updateBankRwaOperational',
          payload: {
            classHourId,
            bankRwaOperationalId,
            totalRisk,
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
      dispatch({
        type: 'studentHandle/queryBankRwaOperationals',
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
      title: '业务类型',
      dataIndex: 'bizTypeName',
      key: 'bizTypeName',
      render: (bizTypeName) => <Tag color="#009933">{bizTypeName}</Tag>,
    },
    {
      title: '利率属性',
      dataIndex: 'rateTypeName',
      key: 'rateTypeName',
      render: (rateTypeName) => <Tag color="#009933">{rateTypeName}</Tag>,
    },
    {
      title: '客户类型',
      dataIndex: 'customerTypeName',
      key: 'customerTypeName',
    },
    {
      title: '金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => `${amount / 10000}`,
    },
    {
      title: '风险小计',
      dataIndex: 'totalRisk',
      key: 'totalRisk',
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
              onClick={() => updateBankRwaOperational(record._key)}
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
    <Card title="操作风险" bordered={false} type="inner">
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
      <HandleRule />
    </Card>
  );
};

export default connect(({ studentHandle, loading }) => ({
  dataSource: studentHandle.queryBankRwaOperationalsData,
  loading: loading.effects['studentHandle/queryBankRwaOperationals'],
  saveLoading: loading.effects['studentHandle/updateBankRwaOperational'],
}))(HandleTable);
