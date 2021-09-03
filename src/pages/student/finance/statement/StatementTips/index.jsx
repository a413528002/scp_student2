import React from 'react';
import {history} from "umi";
import { Alert, Button } from 'antd';

const StatementTips = ({ errMsg }) => {
  return (
    <Alert
      description={`${errMsg}。是否前往【第三方咨询】，购买提示咨询.`}
      type="error"
      showIcon
      action={
        <Button size="small" type="primary" onClick={()=>history.replace('/student/consultation')}>
          去第三方咨询
        </Button>
      }
      closable
    />
  );
};

export default StatementTips;
