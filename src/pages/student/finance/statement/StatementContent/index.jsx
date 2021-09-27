import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Empty, message, Row, Spin } from 'antd';
import { EditableProTable } from '@ant-design/pro-table';
import { isNumber, unique } from '@/utils/commonUtils';

// 报表展示的组件
const StatementContent = (props) => {
  const {
    reportDetails, // 报表数据
    titleItem, // 项目标题
    titleB, // 期初标题
    titleM, // 期中标题
    titleE, // 期末标题
    editable, // 是否可编辑
    onSubmit, // 提交时调用
    loading, // 加载动画
  } = props;
  // 提交报表Loading效果
  const [dataSource, setDataSource] = useState([]);

  // 分区数据合并到DataSource里面去
  const mergeDataSource = (partitionList) => {
    setDataSource(
      dataSource.map((item) => {
        const data = partitionList.find((e) => e.bankReportDetailId === item.bankReportDetailId);
        if (data) {
          return data;
        }
        return item;
      }),
    );
  };

  // column数组去重
  const columnArray = unique(reportDetails?.map((item) => item.columnNo) || []);

  // 是否显示保存报表的按钮
  const showSubmitButton = editable && onSubmit && columnArray.length > 0;

  const columns = [
    {
      title: titleItem,
      dataIndex: 'valueItem',
      key: 'valueItem',
      width: '40%',
      editable: false,
    },
    {
      title: titleE,
      dataIndex: 'valueE',
      key: 'valueE',
      editable,
    },
    {
      title: titleM,
      dataIndex: 'valueM',
      key: 'valueM',
      editable,
    },
    {
      title: titleB,
      dataIndex: 'valueB',
      key: 'valueB',
      editable: false,
    },
  ].filter((item) => item.title !== ''); // title为''的不展示

  const onSubmit0 = (e) => {
    for (let dataSourceElement of dataSource) {
      const { valueB, valueM, valueE } = dataSourceElement;
      // 暂时先这样预防输入非数字的金额
      if (!isNumber(valueB) || !isNumber(valueM) || !isNumber(valueE)) {
        message.error('输入金额格式错误');
        return;
      }
    }
    onSubmit(dataSource);
  };

  useEffect(() => {
    if (reportDetails) {
      setDataSource(reportDetails);
    }
  }, [reportDetails]);

  return (
    <Spin spinning={loading || false}>
      <Card bordered={true} bodyStyle={{ padding: '0px' }}>
        <Row justify={'start'} wrap={false}>
          {columnArray.length > 0 ? (
            columnArray.map((columnNo) => (
              <Col key={columnNo} flex={1} order={columnNo}>
                <StatementContentTable
                  dataSource={dataSource.filter((item) => item.columnNo === columnNo)}
                  columns={columns}
                  onValuesChange={mergeDataSource}
                />
              </Col>
            ))
          ) : (
            <Col flex={1}>
              <Empty />
            </Col>
          )}
        </Row>
      </Card>
      {/* 可编辑并且props传入onSubmit时渲染保存的按钮 */}
      {showSubmitButton && (
        <Card bordered={false} style={{ textAlign: 'center' }}>
          <Button type="primary" onClick={onSubmit0}>
            保存报表
          </Button>
        </Card>
      )}
    </Spin>
  );
};

const StatementContentTable = (props) => {
  const { dataSource, columns, onValuesChange } = props;

  // 获取所有编辑的key 如果不是当前期不返回可编辑的key
  const editableKeys = dataSource?.map((item) => item.bankReportDetailId);

  return (
    <>
      <EditableProTable
        tableStyle={{ whiteSpace: 'pre' }} // 显示空格
        cardProps={{ bodyStyle: { padding: '0px' } }} // 去除ProTable里内嵌的Card的padding
        columns={columns}
        rowKey="bankReportDetailId"
        value={dataSource}
        editable={{
          type: 'multiple',
          editableKeys,
          onValuesChange: (_, recordList) => {
            onValuesChange(recordList);
          },
        }}
        recordCreatorProps={false}
        bordered
      />
    </>
  );
};

export default StatementContent;
