import React from 'react';
import {Table} from "antd";

const PublicTable = (props) => {
  const {dataSource, columns, bordered, rowSelection, pagination, loading, rowClassName,components} = props;
  // console.log(rowClassName)
  // console.log(components)
  return (
    <Table
      // 边框
      bordered={bordered || false}
      // 数据源
      dataSource={dataSource}
      // 表头
      columns={columns}
      // row选择项
      rowSelection={rowSelection || false}
      // row唯一key值
      // 后端约定带上 _key 字段
      rowKey={record => record._key}
      // 表格大小
      size='small'
      // x方向滚动距离
      scroll={{x: 750}}
      // 分页 defaultPageSize 默认每页显示数量
      pagination={pagination}
      loading={loading}
      rowClassName={rowClassName}
      components={components}
    />
  );
};

export default PublicTable;
