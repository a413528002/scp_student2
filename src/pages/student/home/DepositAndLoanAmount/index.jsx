import React, { useEffect } from 'react';
import { connect } from 'umi';
import * as echarts from 'echarts';

const DepositAndLoanAmount = (props) => {
  const {dispatch, classOpt, bankOpt, bankData} = props;
  const {searchLoading, joinLoading} = props;

  const initEchart = () => {
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', '存款总量', '贷款总量'],
          ['第1期', 216000, 192000],
          ['第2期', 204000, 156000],
          ['第3期', 192000, 168000],
          ['第4期', 165000, 110000],
          ['第5期', 160600, 110000],
          ['第6期', 165000, 143000],
          ['第7期', 172800, 148800],
          ['第8期', 88000, 88000],
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {type: 'bar'},
        {type: 'bar'},
      ]
    };

    const chartDom = document.getElementById('dpstAndLoanAmount');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }

  useEffect(() => {
    initEchart()
  }, [])

  return (
    <>
      <div id = 'dpstAndLoanAmount' style={{height: 400}}/>
    </>
  );
}

export default connect(() => ({

}))(DepositAndLoanAmount)
