import React, { useEffect, useState } from 'react';
import { connect } from 'umi';
import { Button, Card } from 'antd';
import PublicTable from '@/components/Table';
import UpdateClassVarModal from '@/pages/teacher/classvar/UpdateClassVarModal';

const Control = (props) => {
    const {dispatch, dataSource, loading} = props
    const [classVarData, setClassVarData] = useState({})
    // 显示modal
    const handleUpdateClassVarShowModal = (record) => {
      setClassVarData(record)
    };

    // 关闭modal
    const handleUpdateClassVarCancelModal = () => {
      setClassVarData({})
    };

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
        render: (_, record) => (

          <Button type='primary' size='small' onClick={e => handleUpdateClassVarShowModal(record)}>
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
          <UpdateClassVarModal
            handleUpdateClassVarCancelModal={handleUpdateClassVarCancelModal}
            classVarData={classVarData}
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
