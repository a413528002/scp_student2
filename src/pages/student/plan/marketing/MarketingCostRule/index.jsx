import React from 'react';
import styles from '@/pages/plan/marketing/index.less'

const MarketingCostRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        1、精准营销费用最小单位变动为10万；<br/>
        2、精准对公存款营销费用为存款总额的3%，精准对私存款营销费用为存款总额的2%；<br/>
        3、精准贷款营销费用为贷款总额的1%；<br/>
        4、精准营销费用不足的部分按实际超额部分*超额补足倍率。
      </p>
    </div>
  );
};

export default MarketingCostRule;
