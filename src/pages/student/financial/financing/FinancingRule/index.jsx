import React from 'react';
import styles from '@/pages/student/financial/financing/index.less';

const FinancingRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：
        <br />
        1、浮动计算规制：收益乘数 = 100*（收益上限-收益下限）；收益率 =
        预计收益率+（投融资市场总量-购买总量）/（收益乘数*投融资市场总量）；
        <br />
        2、收益率最大、最小值分别为收益上限、下限，如：根据浮动计算规制算出收益率为11%，因收益上限为10%，则收益率为10%。
      </p>
    </div>
  );
};

export default FinancingRule;
