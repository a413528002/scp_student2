import React from 'react';
import { Tag } from 'antd';

const Tags = ({ children }) => {
  if (!children) return null;
  return <Tag color="#009933">{children}</Tag>;
};

export default Tags;
