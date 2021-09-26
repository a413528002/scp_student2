import React from 'react';
import styles from '@/pages/student/deal/asset/index.less';

const AssetRule = () => {
  return (
    <div className={styles.rule}>
      <p>
        规则：
        <br />
        1、不良资产变卖：当期即可收回资金，抵押、保证、信用的回收率分别为70%、80%、90%。
        <br />
        2、不良资产清收：按照贷款不同类型，回收的周期不同，抵押、保证、信用分别处置回收期为3期、2期、1期，待处置周期完成后，才可收回资金。
        <br />
        3、根据贷款信用评级不同，不良资产清收的回收率不同，其中AAA回收率为80%，信用等级每下降一个等级，回收率下降5%。
      </p>
    </div>
  );
};

export default AssetRule;
