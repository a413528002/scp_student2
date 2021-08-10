import React, {useEffect} from 'react';
import {connect} from 'umi'
import PublicTable from "@/components/Table";
import {Button} from "antd";

const ChannelTable = (props) => {
  const {dispatch, dataSource, loading} = props;
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
      render: (_, {channel}) => (<Button
        type="primary"
        size="small"
        onClick={() => createBankChannel(channel)}
      >
        建设
      </Button>)
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
