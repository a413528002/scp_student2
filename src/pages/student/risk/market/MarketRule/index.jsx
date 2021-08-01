import React from 'react';
import styles from "@/pages/risk/market/index.less";

const MarketRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        1、市场风险根和银行不同期间的利率敏感性缺口相关，利率敏感性缺口=敏感性资产-敏感性负债。<br/>
        2、市场风险加权资产=Σ(|剩余i期的缺口|*市场风险系数)。<br/>
        3、剩余1期市场风险系数为0.2，剩余期数每增加1期，市场风险系数增加0.1。
      </p>
    </div>
  );
};

export default MarketRule;
