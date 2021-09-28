import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import Million from '@/components/Million';
import Tags from '@/components/Tags';
import { Button, Form, InputNumber, Popconfirm, Space } from 'antd';
import {yuan} from "@/utils/commonUtils";

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

const DepreciationManage = (props) => {
  const { dispatch, loading } = props;
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
      amount: record.amount / 10000, // 转换金额
    });
    setEditingKey(record._key);
  };
  // 取消编辑pop
  const handleCancelPop = () => {
    setEditingKey('');
  };

  /**
   * 更新费用
   * @param bankDepreciationId 当前行的id
   * @returns {Promise<void>}
   */
  const updateBankDepreciation = async (bankDepreciationId) => {
    try {
      const values = await form.validateFields();
      if (values && classHourId && bankDepreciationId) {
        const params = yuan(values);
        // 更新费用
        dispatch({
          type: 'studentOperation/updateBankExpense',
          payload: {
            classHourId,
            bankDepreciationId,
            ...params,
          },
          callback: () => setEditingKey(''),
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // 查询当前期间折旧管理数据
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentDepreciation/queryCurBankDepreciations',
        payload: { classHourId },
      });
    }
  }, []);

  const columns = [
    {
      title: '资产类别',
      dataIndex: 'assetsTypeName',
      key: 'assetsTypeName',
      render: (assetsTypeName) => <Tags>{assetsTypeName}</Tags>,
    },
    {
      title: '完成建设/购入期间',
      dataIndex: 'assetsPeriod',
      key: 'assetsPeriod',
      render: (assetsPeriod) => `第${assetsPeriod}期`,
    },
    {
      title: '购置金额(万元)',
      dataIndex: 'assetsAmount',
      key: 'assetsAmount',
      render: (assetsAmount) => <Million>{assetsAmount}</Million>,
    },
    {
      title: '折旧方法',
      dataIndex: 'depreciationMethodName',
      key: 'depreciationMethodName',
      render: (depreciationMethodName) => <Tags>{depreciationMethodName}</Tags>,
    },
    {
      title: '折旧期限',
      dataIndex: 'depreciationPeriods',
      key: 'depreciationPeriods',
      render: (depreciationPeriods) => `${depreciationPeriods}期`,
    },
    {
      title: '已折旧期数',
      dataIndex: 'depreciatedPeriods',
      key: 'depreciatedPeriods',
      render: (depreciatedPeriods) => `${depreciatedPeriods}期`,
    },
    {
      title: '本期计提金额(万元)',
      dataIndex: 'amount',
      key: 'amount',
      editable: true,
      render: (amount) => <Million>{amount}</Million>,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      fixed: 'right',
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <Space>
            <Button
              type="primary"
              size="small"
              onClick={() => updateBankDepreciation(record._key)}
              // loading={saveLoading}
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
  );
};

export default connect(({ studentDepreciation, loading }) => ({
  dataSource: studentDepreciation.queryCurBankDepreciationData,
  loading: loading.effects['studentDepreciation/queryCurBankDepreciations'],
}))(DepreciationManage);
