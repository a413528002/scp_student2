import React from 'react';
import Tags from '@/components/Tags';
import { bizType } from '@/utils/commonUtils';

const BizType = ({ children }) => {
  if (!children) return null;
  const type = bizType(children);
  return <Tags>{type}</Tags>;
};

export default BizType;
