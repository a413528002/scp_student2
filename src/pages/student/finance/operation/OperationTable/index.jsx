import React, {useState} from 'react';
import PublicTable from "@/components/Table";
import {Select, Button, Form, InputNumber} from "antd";
import styles from '@/pages/student/finance/operation/index.less'
const originData = [];
for (let i = 0; i < 8; i++) {
  originData.push({
    _key: i.toString(),
    period: `${i}`,
    customerTypeName: '假数据',
    // amount: Math.random() * 100000000,
    regionName: 'A',
    status: true,
  });
}
console.log(originData)

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
  const inputNode = <InputNumber min={0}/>;
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
              message: `请输入 ${title}`,
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

const OperationTable = () => {
  // const dataSource = [];
  const [form] = Form.useForm();
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  const [data, setData] = useState(originData);
  // 初始编辑row
  const [editingKey, setEditingKey] = useState(["0","1","2","3"]);
  // editingKey.map((item)=>)
  const isEditing = (record) => record._key === editingKey;
  // const isEditing = (record) => true;
  // 保存当前编辑row
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      console.log(row)
      /*if (row) {
        // 投入营销费用
        dispatch({
          type: 'studentPlan/inputMarketingCost',
          payload: {
            classHourId,
            ...row
          }
        })
      }*/
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);

      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {...item, ...row});
        setData(newData);
        setEditingKey(null);
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey(null);
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      render:(period)=>`第${period}期`
    },
    {
      title: '类别',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: '总行/支行',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '区域',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '费用(万元)',
      dataIndex: '_key',
      key: '_key',
      editable: true
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
    <>
      <div className={styles.choose}>
        <Select defaultValue="one" style={{width: 120}}>
          <Select.Option value="one">第一期</Select.Option>
          <Select.Option value="two">第二期</Select.Option>
        </Select>
        <Button type="primary" onClick={()=>save()}>保存</Button>
      </div>
      {/*表单提交*/}
      <Form form={form} component={false}>
        <PublicTable
          components={{
            body: {
              cell: EditableCell,
            },
          }}
          rowClassName="editable-row"
          dataSource={originData}
          columns={columnsData}
          bordered
        />
      </Form>
    </>
  );
};

export default OperationTable;
