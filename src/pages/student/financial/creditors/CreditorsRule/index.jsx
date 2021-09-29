import React from 'react';
import styles from '@/pages/student/financial/creditors/index.less';

const CreditorsRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：
        <br />
        1、一般情况下：国债稳定性&gt;地方债&gt;企业债&gt;垃圾债，收益则相反；
        <br />
        2、地方债、企业债收益根据根据宏观区域债券市场总量与购买机构总量而定；
        <br />
        3、浮动计算规制：收益乘数 = 100*（收益上限-收益下限）；收益率 = 预计收益率
        +（债券市场总量-购买总量）/（收益乘数*债券市场总量）；
        <br />
        4、收益率最大、最小值分别为收益上限、下限，如：根据浮动计算规制算出收益率为11%，因收益上限为10%，则收益率为10%。
      </p>
    </div>
  );
};

export default CreditorsRule;
