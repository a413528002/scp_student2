import React, { useEffect } from 'react';
import '../../../../../utils/china.js';
import * as echarts from 'echarts';
// import { TitleComponent, TooltipComponent, VisualMapComponent  } from 'echarts/components';
// import { EffectScatterChart, ScatterChart, MapChart  } from 'echarts/charts';
// import { CanvasRenderer } from 'echarts/renderers';

// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   VisualMapComponent,
//   ScatterChart,
//   MapChart,
//   EffectScatterChart,
//   CanvasRenderer,
// ]);

// "北京市",
//     "天津市",
//     "河北省",
//     "山西省",
//     "内蒙古自治区",
//     "辽宁省",
//     "吉林省",
//     "黑龙江省",
//     "上海市",
//     "江苏省",
//     "浙江省",
//     "安徽省",
//     "福建省",
//     "江西省",
//     "山东省",
//     "河南省",
//     "湖北省",
//     "湖南省",
//     "广东省",
//     "广西壮族自治区",
//     "海南省",
//     "重庆市",
//     "四川省",
//     "贵州省",
//     "云南省",
//     "西藏自治区",
//     "陕西省",
//     "甘肃省",
//     "青海省",
//     "宁夏回族自治区",
//     "新疆维吾尔自治区",
//     "台湾省",
//     "香港特别行政区",
//     "澳门特别行政区",
// http://datav.aliyun.com/tools/atlas/index.html#&lat=30.332329214580188&lng=106.72278672066881&zoom=3.5
const regionMap = {
  'A': [
    "北京市",
    "天津市",
    "河北省",
    "山西省",
    "辽宁省",
    "上海市",
    "江苏省",
    "浙江省",
    "安徽省",
    "福建省",
    "江西省",
    "山东省",
    "河南省",
    "湖北省",
    "湖南省",
    "广东省",
    "广西壮族自治区",
    "海南省",
    "重庆市",
    "贵州省",
    "陕西省",
    "宁夏回族自治区",
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区",
  ],
  'B': ["青海省","西藏自治区","四川省","云南省"],
  'C': ["新疆维吾尔自治区","甘肃省","内蒙古自治区","黑龙江省","吉林省"]
}

function getColor(region) {
  if (region === 'A') {
    return 1
  } else if (region === 'B') {
    return 11
  } else if (region === 'C') {
    return 21
  }
  return -1;
}
let option;
const data = [...regionMap.A.map(item => {return {
  name: item,
  value: getColor('A')
}}),...regionMap.B.map(item => {return {
  name: item,
  value: getColor('B')
}}),...regionMap.C.map(item => {return {
  name: item,
  value: getColor('C')
}})];


const OrganizationBackMap = () => {
  const initEchart = () => {

    const myMain = document.getElementById('testobm');
    const myChart = echarts.init(myMain);

    option = {
      // title: {
      //   text: '中国地图',
      //   subtext: 'data from PM25.in',
      //   sublink: 'http://www.pm25.in',
      //   left: 'center',
      // },
      tooltip: {
        trigger: 'item',
      },
      dataZoom: {
        zoomLock: true
      },
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        splitList: [
          { start: 20, end: 30 },
          { start: 10, end: 20 },
          { start: 0, end: 10 },
        ],
        color: [
          '#4D649F',
          '#57A152',
          '#441C25'
        ],
      },
      series: [
        {
          name: '数据',
          type: 'map',
          mapType: 'china202105',
          roam: false,
          label: {
            normal: {
              show: false,
            },
            emphasis: {
              show: false,
            },
          },
          data: data
        },
      ],
    };
    myChart.setOption(option);
    myChart.on('click', function (params) {
      console.log(params);
    });
  }

  useEffect(() => {
    initEchart()
  }, [])

  return (
    <div id={'testobm'} style={{height: 400}}>
    </div>
  );
};

export default OrganizationBackMap;
