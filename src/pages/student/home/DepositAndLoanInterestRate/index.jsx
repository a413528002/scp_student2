import React, { useEffect } from 'react';
import { connect } from 'umi';
import * as echarts from 'echarts';

const DepositAndLoanInterestRate = (props) => {
  const {dispatch, classOpt, bankOpt, bankData} = props;
  const {searchLoading, joinLoading} = props;

  const initEchart = () => {
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '零售存款平均利率', '对公存款平均利率', '贷款平均利率'],
          ['第1期', 0.06, 0.05, 0.14],
          ['第2期', 0.05, 0.04, 0.14],
          ['第3期', 0.06, 0.05, 0.12],
          ['第4期', 0.07, 0.06, 0.16],
          ['第5期', 0.06, 0.06, 0.15],
          ['第6期', 0.06, 0.05, 0.14],
          ['第7期', 0.06, 0.05, 0.14],
          ['第8期', 0.08, 0.07, 0.00],
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {axisLabel: {
          formatter: (val) => val * 100 + '%'
        }},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'}
      ]
    };

    const chartDom = document.getElementById('dpstAndLoanInstRate');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }

  useEffect(() => {
    initEchart()
  }, [])

  return (
    <>
      <div id = 'dpstAndLoanInstRate' style={{height: 400}}/>
    </>
  );
}

export default connect(() => ({

}))(DepositAndLoanInterestRate)
