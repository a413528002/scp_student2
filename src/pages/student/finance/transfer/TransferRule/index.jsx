import React from 'react';
import styles from '@/pages/student/finance/transfer/index.less'

const TransferRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        自有资金可以通过资金转账转为存款，转账金额的最大额度为存款缺口值(若有缺口，业务结账的时候会有提示)，且一旦转出不能转回。
      </p>
    </div>
  );
};

export default TransferRule;
