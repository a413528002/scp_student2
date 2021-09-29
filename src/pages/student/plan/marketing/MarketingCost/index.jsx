import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card, Form, InputNumber, Popconfirm, message } from 'antd';
import PublicTable from '@/components/Table';
import MarketingCostRule from '@/pages/student/plan/marketing/MarketingCostRule';
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

const MarketingCost = (props) => {
  const { dispatch, dataSource, loading, submitLoading } = props;
  const [form] = Form.useForm();
  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};
  // 初始编辑row
  const [editingKey, setEditingKey] = useState(0);
  const isEditing = (record) => record._key === editingKey;
  // 保存当前编辑row
  const save = async (key) => {
    try {
      const values = await form.validateFields();
      if (values) {
        const params = yuan(values);
        // 投入营销费用
        dispatch({
          type: 'studentMarketing/inputMarketingCost',
          payload: {
            classHourId,
            ...params,
          },
          callback: () => setEditingKey(null),
        });
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };

  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentMarketing/queryCurBankMarketing',
        payload: {
          classHourId,
        },
      });
    }
  }, []);

  // 关闭pop
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
      title: '存款营销费用(万元)',
      dataIndex: 'depositMktCost',
      key: 'depositMktCost',
      // 当前字段值为null时显示提交按钮 且可以编辑
      editable: dataSource.every((item) => item.depositMktCost === null),
      // 表头单位为万元
      render: (depositMktCost) => <Million>{depositMktCost}</Million>,
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'loanMktCost',
      key: 'loanMktCost',
      // 当前字段值为null时显示提交按钮 且可以编辑
      editable: dataSource.every((item) => item.loanMktCost === null),
      // 表头单位为万元
      render: (loanMktCost) => <Million>{loanMktCost}</Million>,
    },
    {
      title: '超额补足倍率',
      dataIndex: 'makeUpRate',
      key: 'makeUpRate',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, { depositMktCost, loanMktCost, _key }) => {
        return (
          <>
            {depositMktCost === null || loanMktCost === null ? (
              <Popconfirm title="确认提交?" onConfirm={() => save(_key)} onCancel={handleCancelPop}>
                <Button type="primary" size="small" loading={submitLoading}>
                  提交
                </Button>
              </Popconfirm>
            ) : (
              '已提交'
            )}
          </>
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
    <Card title="营销费用" bordered={false} type="inner">
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
          pagination={false}
        />
      </Form>
      <MarketingCostRule />
    </Card>
  );
};

export default connect(({ studentMarketing, loading }) => ({
  dataSource: studentMarketing.bankMarketingData,
  loading: loading.effects['studentMarketing/queryCurBankMarketing'],
  submitLoading: loading.effects['studentMarketing/inputMarketingCost'],
}))(MarketingCost);
