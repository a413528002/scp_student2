import React, { useEffect, useRef, useState } from 'react';
import { connect } from 'umi';
import PublicTable from '@/components/Table';
import { Form, InputNumber, Modal } from 'antd';
import Million from '@/components/Million';
import { yuan } from '@/utils/commonUtils';

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

const CreditorsMngModal = (props) => {
  const { modalVisible, handleCancelModal, loading, dispatch, confirmLoading } = props;
  const { bankFinancialBusinessInstId, bankFinancialBusinessInstRow, dataSource } = props;
  const [form] = Form.useForm();
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  // 当前编辑row key
  const [editingKey, setEditingKey] = useState('');
  // 是否可编辑
  const isEditing = (record) => record._key === editingKey;
  // 编辑
  const handleEdit = (editKey, editRow) => {
    form.setFieldsValue({
      // 回显利息
      ...editRow,
    });
    setEditingKey(editKey);
  };
  // 初始化编辑状态
  useEffect(() => {
    handleEdit(bankFinancialBusinessInstId, bankFinancialBusinessInstRow);
  }, [bankFinancialBusinessInstId, bankFinancialBusinessInstRow]);

  // 保存债券利息
  const updateDepositInterest = async () => {
    try {
      const values = await form.validateFields();
      if (values && classHourId && bankFinancialBusinessInstId) {
        const params = yuan(values);
        dispatch({
          type: 'studentCreditorsMng/updateDebtInterest',
          payload: { classHourId, bankFinancialBusinessInstId, ...params },
          callback: () => {
            handleCancelModal();
            setEditingKey('');
          },
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  // 表头
  const columns = [
    {
      title: '期间',
      dataIndex: 'period',
      key: 'period',
      render: (period) => `第${period}期`,
    },
    {
      title: '收益(万元)',
      dataIndex: 'interest',
      key: 'interest',
      editable: true,
      render: (interest) => <Million>{interest}</Million>,
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
    <Modal
      visible={modalVisible}
      onCancel={handleCancelModal}
      onOk={updateDepositInterest}
      title="收益结算"
      okButtonProps={{ disabled: !bankFinancialBusinessInstId }}
      confirmLoading={confirmLoading}
    >
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
          scroll={{ x: null }}
          bordered
        />
      </Form>
    </Modal>
  );
};

export default connect(({ studentCreditorsMng, loading }) => ({
  dataSource: studentCreditorsMng.queryDepositInterestsData,
  bankFinancialBusinessInstId: studentCreditorsMng.editBankFinancialBusinessInstId,
  bankFinancialBusinessInstRow: studentCreditorsMng.editRow,
  confirmLoading: loading.effects['studentCreditorsMng/updateDebtInterest'],
  loading: loading.effects['studentCreditorsMng/queryDepositInterests'],
}))(CreditorsMngModal);
