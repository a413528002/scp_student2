import React, {useEffect, useState, useRef, useContext} from 'react';
import {connect} from 'umi';
import {Button, Card, Form, InputNumber} from "antd";
import PublicTable from "@/components/Table";
import MarketingCostRule from "@/pages/student/plan/marketing/MarketingCostRule";

const EditableContext = React.createContext(null);

const EditableRow = ({index, ...props}) => {
  const [form] = Form.useForm();
  return (
    <Form form={form} component={false}>
      <EditableContext.Provider value={form}>
        <tr {...props} />
      </EditableContext.Provider>
    </Form>
  );
};

const EditableCell = ({
                        title,
                        editable,
                        children,
                        dataIndex,
                        record,
                        handleSave,
                        editing,
                        setEditing,
                        ...restProps
                      }) => {
  // const [editing, setEditing] = useState(false);
  const inputRef = useRef(null);
  const form = useContext(EditableContext);
  console.log(setEditing)
  useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);

  const toggleEdit = () => {
    setEditing(!editing);
    form.setFieldsValue({
      [dataIndex]: record[dataIndex],
    });
  };

  const save = async () => {
    try {
      const values = await form.validateFields();
      toggleEdit();
      handleSave({...record, ...values});
    } catch (errInfo) {
      console.log('Save failed:', errInfo);
    }
  };

  let childNode = children;
  // console.log(children)
  if (editable) {
    childNode = editing ? (
      <Form.Item
        style={{
          margin: 0,
        }}
        name={dataIndex}
        rules={[
          {
            required: true,
            message: `请输入${title}`,
          },
        ]}
      >
        <InputNumber
          ref={inputRef}
          onPressEnter={save}
          onBlur={save}
        />
      </Form.Item>
    ) : (
      <div
        className="editable-cell-value-wrap"
        style={{
          paddingRight: 24,
        }}
        onClick={toggleEdit}
      >
        {children}
      </div>
    );
  }
  // console.log(childNode)
  return <td {...restProps}>{childNode}</td>;
};


const MarketingCost = (props) => {
  const {dispatch, dataSource, loading} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  const [editing, setEditing] = useState(false);
  useEffect(() => {
    if (classHourId) {
      dispatch({
        type: 'studentPlan/queryCurBankMarketing',
        payload: {
          classHourId
        }
      })
    }
  }, [])
  console.log()
  const columns = [
    {
      title: '期数',
      dataIndex: 'period',
      key: 'period',
      // editable: true,
      render: (period) => `第${period}期`
    },
    {
      title: '存款营销费用(万元)',
      dataIndex: 'depositMktCost',
      key: 'depositMktCost',
      editable: dataSource.every((item=>item.depositMktCost === null)),
      // 当前字段值为null时显示提交按钮 且可以编辑
    },
    {
      title: '贷款营销费用(万元)',
      dataIndex: 'loanMktCost',
      key: 'loanMktCost',
      editable: dataSource.every((item=>item.loanMktCost === null)),
      // 当前字段值为null时显示提交按钮 且可以编辑
    },
    {
      title: '超额补足倍率',
      dataIndex: 'makeUpRate',
      key: 'makeUpRate',
      // editable: true,
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, {depositMktCost, loanMktCost}) => {
        return (
          <>
            {
              depositMktCost === null || loanMktCost === null ? (<Button
                type="primary"
                size="small"
                // inputMarketingCost(depositMktCost, loanMktCost)
                onClick={() => setEditing(true)}
              >
                提交
              </Button>) : "不能提交"
            }
          </>
        )
      }
    },
  ];
  // 投入营销费用
  const inputMarketingCost = (values) => {
    if (values) {
      dispatch({
        type: 'studentPlan/inputMarketingCost',
        payload: {
          classHourId,
          ...values
        }
      })
    }

  }
  const handleSave = (row) => {
    // 提交保存的数据
    inputMarketingCost(row)
    const newData = [...dataSource];
    const index = newData.findIndex((item) => row.key === item.key);
    const item = newData[index];
    newData.splice(index, 1, {...item, ...row});
  };
  const components = {
    body: {
      row: EditableRow,
      cell: EditableCell,
    },
  };
  // 表头
  const columnsData = columns.map((col) => {
    if (!col.editable) {
      return col;
    }

    return {
      ...col,
      onCell: (record) => ({
        record,
        editable: col.editable,
        dataIndex: col.dataIndex,
        title: col.title,
        handleSave: handleSave,
        editing: editing,
        setEditing: setEditing,
      }),
    };
  });
  return (
    <Card
      title='营销费用'
      bordered={false}
      type='inner'
    >
      <PublicTable
        components={components}
        rowClassName={() => 'editable-row'}
        dataSource={dataSource}
        columns={columnsData}
        loading={loading}
        bordered
        pagination={false}
      />
      <MarketingCostRule/>
    </Card>
  );
};

export default connect(({studentPlan, loading}) => ({
  dataSource: studentPlan.bankMarketingData,
  loading: loading.effects['studentPlan/queryCurBankMarketing']
}))(MarketingCost)
