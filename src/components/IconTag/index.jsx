import React from 'react';
import { CheckCircleFilled, CloseCircleFilled } from '@ant-design/icons';

const IconTag = ({ children }) => {
  switch (children) {
    case true:
      return <CheckCircleFilled style={{ color: '#009933' }} />;
    case false:
      return <CloseCircleFilled style={{ color: '#555555' }} />;
    default:
      break;
  }
};

export default IconTag;
