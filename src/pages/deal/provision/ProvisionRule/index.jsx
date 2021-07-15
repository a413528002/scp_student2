import React from 'react';
import styles from '@/pages/deal/provision/index.less'

const ProvisionRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        拨备管理计提比例为1%，最低计提比例为100万。
      </p>
    </div>
  );
};

export default ProvisionRule;
