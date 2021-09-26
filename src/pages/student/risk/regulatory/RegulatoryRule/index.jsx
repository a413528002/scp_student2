import React from 'react';
import styles from '@/pages/student/risk/regulatory/index.less';

const RegulatoryRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：
        <br />
        1、投融资业务的风险加权资产由项目金额决定。项目风险加权资产等于项目金额乘以100%。例如，项目金额为5000W的投融资业务，其风险加权资产为5000x100%=5000.。
        <br />
        2、风险加权资产总值(总风险值) =信用风险加权资产+操作风险加权资产+市场风险加权资产+投融资风险加权资产。
        <br />
        3、监管资本=风险加权资产总值*10%。
        <br/>
        4、资本充足率不低于10%，资本充足率=银行所有者权益/风险加权资产总值x100% (保留小数点后两位)。
        <br/>
        5、存贷比不得高于100%，存贷比=贷款总额/存款总额(保留小数点后两位)。
        <br/>
        6、拨备覆盖率不低于100%，拨备覆盖率=贷款减值准备/不良贷款金额*100%，注:如果拨备覆盖率为无穷大，那么输入框中应该填入10。
      </p>
    </div>
  );
};

export default RegulatoryRule;
