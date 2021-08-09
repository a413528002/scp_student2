import React from 'react';
import styles from "@/pages/student/risk/credit/index.less";

const CreditRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：<br/>
        1、信用风险加权资产计算公式为：<br/> 信用贷款风险加权资产=剩余风险暴露*贷款分类系数*期限系数*信用风险系数；<br/> 剩余风险暴露=贷款金额-缓释工具金额（质押或担保金额）*抵押保证率。<br/>
        2、正常类贷款的贷款分类系数为1，关注类贷款的贷款分类系数为2。<br/>
        3、期限系数1期为1，之后每增加1期，系数增加0.1。<br/>
        4、信用风险系数AAA为0.3，每降低一个凭借，系数增加0.4。<br/>
        5、抵押品的保证率为100%，保证品（担保）的保证率为50%，信用贷款保证率为0。

      </p>
    </div>
  );
};

export default CreditRule;
