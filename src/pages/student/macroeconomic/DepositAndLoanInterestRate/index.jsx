import React, { useEffect, useState } from 'react';
import * as echarts from 'echarts/core';
import { DatasetComponent, GridComponent, LegendComponent, TooltipComponent } from 'echarts/components';
import { BarChart } from 'echarts/charts';
import { CanvasRenderer } from 'echarts/renderers';
import { queryDepositAndLoanInterestRate } from '@/services/student/me';
import { Empty, Spin } from 'antd';

echarts.use(
  [DatasetComponent, TooltipComponent, GridComponent, LegendComponent, BarChart, CanvasRenderer]
);

const DepositAndLoanInterestRate = (props) => {
  const[loading, setLoading] = useState(false)

  // 获取课堂id
  const { classHourId } = JSON.parse(localStorage.getItem('STUDENT_IN_CLASS')) || {};

  const initEchart = (data) => {
    const option = {
      legend: {},
      tooltip: {},
      dataset: {
        source: data
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
    if (classHourId) {
      setLoading(true)
      queryDepositAndLoanInterestRate({ classHourId })
        .then(initEchart)
        .finally(() => setLoading(false))
    }
  }, [classHourId])

  return (
    <>
      {
        classHourId ?
          (
            <Spin spinning={loading}>
              <div id = 'dpstAndLoanInstRate' style={{height: 400}}/>
            </Spin>
          ) : (<Empty/>)
      }
    </>
  );
}

export default DepositAndLoanInterestRate
