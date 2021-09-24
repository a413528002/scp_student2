import React from 'react';
import styles from '@/pages/student/deal/prepare/index.less'

const PrepareRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        存款准备金提取比例为10%，十万位向上取整。如：存款抢单6100万元，则提取700万的存款准备金。
      </p>
    </div>
  );
};

export default PrepareRule;
