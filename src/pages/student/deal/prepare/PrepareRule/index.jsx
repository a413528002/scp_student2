import React from 'react';
import styles from '@/pages/student/deal/prepare/index.less'

const PrepareRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        存款准备金提取比例为10%，如：存款抢单7000万元，提取70万的存款准备金。
      </p>
    </div>
  );
};

export default PrepareRule;
