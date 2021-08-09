import React, { useEffect } from 'react';
import { connect } from 'umi';
import * as echarts from 'echarts';

const DepositAndLoanCount = (props) => {
  const {dispatch, classOpt, bankOpt, bankData} = props;
  const {searchLoading, joinLoading} = props;

  const initEchart = () => {
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: [
          ['product', 'A区域存款单数', 'B区域存款单数', 'C区域存款单数', 'A区域贷款单数', 'B区域贷款单数', 'C区域贷款单数'],
          ['第1期', 20, 0, 0, 20, 0, 0],
          ['第2期', 15, 6, 3, 15, 6, 3],
          ['第3期', 12, 6, 4, 12, 6, 4],
          ['第4期', 12, 7, 3, 12, 7, 3],
          ['第5期', 10, 8, 4, 10, 8, 4],
          ['第6期', 14, 6, 4, 14, 6, 4],
          ['第7期', 12, 7, 5, 12, 7, 5],
          ['第8期', 10, 8, 4, 0, 0, 0],
        ]
      },
      xAxis: {type: 'category'},
      yAxis: {},
      // Declare several bar series, each will be mapped
      // to a column of dataset.source by default.
      series: [
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
        {type: 'bar'},
      ]
    };

    const chartDom = document.getElementById('dpstAndLoanCount');
    const myChart = echarts.init(chartDom);
    myChart.setOption(option);
  }

  useEffect(() => {
    initEchart()
  }, [])

  return (
    <>
      <div id = 'dpstAndLoanCount' style={{height: 400}}/>
    </>
  );
}

export default connect(() => ({

}))(DepositAndLoanCount)
