import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";
import {Button, message, Popconfirm} from "antd";

const ChannelTable = (props) => {
  const {dispatch, dataSource, loading} = props;
  // 获取课堂id
  const {classHourId} = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {}
  useEffect(() => {
    if (classHourId) {
      // 查询银行渠道
      dispatch({
        type: 'studentPlan/queryBankChannels',
        payload: {
          classHourId
        }
      })
    }

  }, [])

  // 创建银行渠道
  const createBankChannel = (channel) => {
    dispatch({
      type: 'studentPlan/createBankChannel',
      payload: {
        classHourId,
        channel
      }
    })
  }
  // 取消pop
  const handleCancelPop = () => {
    message.error('已取消')
  }

  const columns = [
    {
      title: '渠道名称',
      dataIndex: 'channelName',
      key: 'channelName',
    },
    {
      title: '建设周期',
      dataIndex: 'spendPeriods',
      key: 'spendPeriods',
    },
    {
      title: '每期建设费用(万元)',
      dataIndex: 'createCost',
      key: 'createCost',
      render:(createCost)=>`${createCost/10000}`
    },
    {
      title: '建设状态',
      dataIndex: 'createStatus',
      key: 'createStatus',
    },
    {
      title: '操作',
      dataIndex: 'operation',
      key: 'operation',
      render: (_, {channel,createStatus}) => {
        switch (createStatus){
          case '已完成':
            return null
          default:
            return (<Popconfirm
              title="确认建设"
              onConfirm={() => createBankChannel(channel)}
              onCancel={handleCancelPop}
            ><Button type="primary" size="small">建设</Button></Popconfirm>)
        }
      }
    },
  ];
  return (
    <PublicTable
      dataSource={dataSource}
      columns={columns}
      loading={loading}
      bordered
    />
  );
};

export default connect(({studentPlan, loading}) => ({
  dataSource: studentPlan.bankChannelsData,
  loading: loading.effects['studentPlan/queryBankChannels']
}))(ChannelTable);
