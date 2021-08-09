import React from 'react';
import styles from '@/pages/student/finance/operation/index.less'

const OperationRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        1、总行运营费用标准：200万/年；<br/>
        2、支行运营费用标准：50万/年；<br/>
        3、总行薪资报酬标准：100万/年；<br/>
        4、支行薪资报酬标准：20万/年。
      </p>
    </div>
  );
};

export default OperationRule;
