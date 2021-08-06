import React, {useEffect} from 'react';
import {connect} from "umi";
import {Button, Card, Descriptions, Empty} from "antd";
import PublicTable from "@/components/Table";

const Control = (props) => {
    const {dispatch, classInfo, loading} = props
    // 获取课堂id
    const {classHourId} = JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) || {}
    const getClassInfoData = () => {
      if (classHourId) {
        dispatch({
          type: 'teacherOperation/queryClassInfo',
          payload: {
            classHourId
          }
        })
      }
    }
    // 获取课堂信息
    useEffect(() => {
      getClassInfoData();
    }, [classHourId])
    const dataSource = [
      {
        _key: '0',
        operationType: '经营控制',
        opt: [
          {
            buttonName: '开始经营',
            buttonDisabled: classInfo.periodStatus !== 'PREPARING',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/startPeriod',
              })
            }
          },
          {
            buttonName: '结束经营',
            buttonDisabled: classInfo.periodStatus !== 'STARTED',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/endPeriod',
              })
            }
          },
          {
            buttonName: '转入下期',
            buttonDisabled: classInfo.periodStatus !== 'ENDED' || classInfo.periodCur === classInfo.periodTtl,
            onClick: () => {
              dispatch({
                type: 'teacherOperation/nextPeriod',
              })
            }
          }
        ]
      },
      {
        _key: '1',
        operationType: '存款抢单',
        opt: [
          {
            buttonName: '开始抢单',
            buttonDisabled: classInfo.periodStatus !== 'STARTED' || classInfo.grabDpstStatus !== 'NONE',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/startGrabDeposit',
              })
            }
          },
          {
            buttonName: '结束抢单',
            buttonDisabled: classInfo.periodStatus !== 'STARTED' || classInfo.grabDpstStatus !== 'STARTED',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/endGrabDeposit',
              })
            }
          },
        ]
      },
      {
        _key: '2',
        operationType: '贷款抢单',
        opt: [
          {
            buttonName: '开始抢单',
            buttonDisabled: classInfo.periodStatus !== 'STARTED' || classInfo.grabLoanStatus !== 'NONE',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/startGrabLoan',
              })
            }
          },
          {
            buttonName: '结束抢单',
            buttonDisabled: classInfo.periodStatus !== 'STARTED' || classInfo.grabLoanStatus !== 'STARTED',
            onClick: () => {
              dispatch({
                type: 'teacherOperation/endGrabLoan',
              })
            }
          },
        ]
      }
    ];

    const columns = [
      {
        title: '控制类型',
        dataIndex: 'operationType',
      },
      {
        title: '操作',
        key: 'opt',
        render: (_, {opt}) =>
          <>
            {opt.map((item,i) =>
              <Button key={i}
                      type='primary'
                      disabled={item.buttonDisabled}
                      onClick={item.onClick}
                      style={{'marginRight':'5px'}}
              >
                {item.buttonName}
              </Button>
            )}
          </>
      },
    ];

    return (
      <>
        <Card
          title="经营信息"
          bordered={false}
          type='inner'
          extra={<Button type="primary" onClick={() => getClassInfoData()} loading={loading}>刷新</Button>}
        >
          {classInfo.classHourId ? (
            <Descriptions column={1}>
              <Descriptions.Item label="期间">{classInfo.periodCur + " / " + classInfo.periodTtl}</Descriptions.Item>
              <Descriptions.Item label="期间状态">{classInfo.periodStatusName}</Descriptions.Item>
              <Descriptions.Item label="当前经营期间开始于">{classInfo.periodCurStartTime ? classInfo.periodCurStartTime : '未开始'}</Descriptions.Item>
            </Descriptions>
          ) : <Empty/>}
        </Card>
        <Card
          title="经营控制"
          bordered={false}
          type='inner'
          // extra={<Button type="primary" onClick={e => getClassInfoData()} loading={loading} >刷新</Button>}
        >
          <PublicTable
            dataSource={dataSource}
            columns={columns}
            bordered
            loading={loading}
            pagination={false}
          />
        </Card>
      </>
    );
  }
;

export default connect(({teacherOperation, loading}) => ({
  classInfo: teacherOperation.teacherOperationClassInfoData,
  loading: loading.effects['teacherOperation/queryClassInfo']
}))(Control);
