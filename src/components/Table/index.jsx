import React from 'react';
import {Table} from "antd";

const PublicTable = (props) => {
  const {dataSource,columns,bordered} = props;
  return (
    <Table
      bordered={bordered||false}
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default PublicTable;
