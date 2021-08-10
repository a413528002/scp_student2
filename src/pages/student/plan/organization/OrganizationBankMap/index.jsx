import React, { useEffect, useState } from 'react';
import '../../../../../utils/china.js';
import * as echarts from 'echarts';
import NewOrganizationModal from '@/pages/student/plan/organization/NewOrganizationModal';
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
const regions = [
  [
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
    "台湾省",
    "香港特别行政区",
    "澳门特别行政区",
  ],
  ["青海省","西藏自治区","四川省","云南省"],
  ["新疆维吾尔自治区","甘肃省","内蒙古自治区","黑龙江省","吉林省", "宁夏回族自治区"]
]

const data = regions.flatMap((item, index) => {
  return item.map(e => {
    return {
      name: e,
      value: index
    }
  })
})



const OrganizationBackMap = () => {

  // 选中的区域
  const [region, setRegion] = useState(null);
  // 新建机构modal显示状态 ----start-----
  const [newOrganizationModalVisible, setNewOrganizationModalVisible] = useState(false);

  // 显示modal
  const handleNewOrganizationShowModal = () => {
    setNewOrganizationModalVisible(true);
  };

  // 关闭modal
  const handleNewOrganizationCancelModal = () => {
    setNewOrganizationModalVisible(false);
  };
  // 新建机构modal显示状态 ----end-----

  const initEchart = () => {

    const myMain = document.getElementById('orgRegion');
    const myChart = echarts.init(myMain);

    const option = {
      title: {
        text: '银行网点分布图',
        subtext: '点击建设银行',
        left: 'center',
      },
      tooltip: {
        show: false,
        // trigger: 'item',
      },
      dataZoom: {
        zoomLock: true
      },
      visualMap: {
        show: true,
        x: 'left',
        y: 'bottom',
        showLabel: true,
        hoverLink: true,
        pieces: [
          { value: 0, label: 'A区', color: '#4D649F'},
          { value: 1, label: 'B区', color: '#57A152'},
          { value: 2, label: 'C区', color: '#570618'},
        ],
      },
      series: [
        {
          selectedMode: false,
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
          itemStyle: {
            emphasis: {//鼠标移入高亮显颜色
              label: {
                show: false,
              },
            }
          },
          data: data
        },
      ],
    };
    myChart.on('click', function (params) {
      if (params.value === 0) {
        setRegion('A');
      } else if (params.value === 1) {
        setRegion('B');
      } else if (params.value === 2) {
        setRegion('C');
      }
      handleNewOrganizationShowModal()
    });
    myChart.on("mouseover", function (params){
      if(params.data.value !== undefined){
        myChart.dispatchAction({
          type: 'downplay'
        });
      }
    });
    myChart.setOption(option);
  }

  useEffect(() => {
    initEchart()
  }, [])

  return (
    <>
      <div id={'orgRegion'} style={{height: 400}}>
      </div>
      <NewOrganizationModal
        newOrganizationModalVisible={newOrganizationModalVisible}
        region={region}
        handleNewOrganizationCancelModal={handleNewOrganizationCancelModal}
      />
    </>
  );
};

export default OrganizationBackMap;
