import React from 'react';
import styles from "@/pages/risk/handle/index.less";

const HandleRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        1、操作风险的大小与业务类型、业务数量相关；<br/>
        2、操作风险加权资产等于各类存款业务量与风险系数之和；<br/>
        3、对公业务操作风险系数为0.18，零售业务操作风险系数为0.12。
      </p>
    </div>
  );
};

export default HandleRule;
