import React, {useEffect} from 'react';
import {connect} from "umi";
import {Button, Card} from "antd";
import PublicTable from "@/components/Table";

const Control = (props) => {
    const {dispatch, dataSource, loading} = props
    // 获取课堂id
    const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
    const getClassVarData = () => {
      if (classHourId) {
        dispatch({
          type: 'teacherClassVar/queryClassVariables',
          payload: {
            classHourId
          }
        })
      }
    }
    // 获取课堂变量参数
    useEffect(() => {
      getClassVarData();
    }, [classHourId])

    const columns = [
      {
        title: '编码',
        dataIndex: 'varKey',
      },
      {
        title: '名称',
        dataIndex: 'varKeyName',
      },
      {
        title: '值',
        dataIndex: 'varValue',
        ellipsis: true,
      },
      {
        title: '详情',
        dataIndex: 'varKeyDesc',
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'opt',
        render: (_, {varKey,varValue,editable}) => (

          <Button type='primary' size='small' disabled={editable}>
            修改
          </Button>
        )
      },
    ];

    return (
      <>
        <Card
          title="参数控制"
          bordered={false}
          type='inner'
          extra={<Button type="primary" onClick={e => getClassVarData()} loading={loading} >刷新</Button>}
        >
          <PublicTable
            dataSource={dataSource}
            columns={columns}
            bordered
            loading={loading}
            pagination={{
              defaultPageSize: 10,
              total: dataSource.length,
            }}
          />
        </Card>
      </>
    );
  }
;

export default connect(({teacherClassVar, loading}) => ({
  dataSource: teacherClassVar.teacherClassVarData,
  loading: loading.effects['teacherClassVar/queryClassVariables']
}))(Control);
