import React, { useEffect } from 'react';
import { connect } from 'umi';
import { Empty } from 'antd';
import PublicTable from '@/components/Table';
import styles from '@/pages/common/rank/index.less';
import Radios from '@/components/Radios';

const RankTable = (props) => {
  const { dispatch, loading } = props;
  const {
    queryBankRanksData: { bankScoreRanks: dataSource, period, periodCur, periodTtl },
  } = props;

  // 获取课堂id
  const { classHourId } =
    JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) ||
    JSON.parse(localStorage.getItem('TEACHER_IN_CLASS')) ||
    {};

  /**
   * 银行排名
   * @param classHourId 课堂id
   * @param period 期数
   */
  const queryBankRanksData = (classHourId, period) => {
    dispatch({
      type: 'teacherRank/queryBankRanksData',
      payload: { classHourId, period },
    });
  };

  useEffect(() => {
    if (classHourId) {
      queryBankRanksData(classHourId);
    }
  }, []);

  // 切换期数
  const onRadioChange = (e) => {
    const period = e.target.value;
    queryBankRanksData(classHourId, period);
  };

  const columns = [
    {
      title: '银行名称',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: '分值',
      dataIndex: 'score',
      key: 'score',
    },
    {
      title: '排名',
      dataIndex: 'rank',
      key: 'rank',
    },
  ];
  return periodTtl ? (
    <>
      <div className={styles.choose}>
        <Radios
          period={period}
          periodCur={periodCur}
          periodTtl={periodTtl}
          onRadioChange={onRadioChange}
        />
      </div>
      <PublicTable dataSource={dataSource} columns={columns} loading={loading} bordered />
    </>
  ) : (
    <Empty />
  );
};

export default connect(({ teacherRank, loading }) => ({
  queryBankRanksData: teacherRank.queryBankRanksData,
  loading: loading.effects['teacherRanking/queryBankRanksData'],
}))(RankTable);
