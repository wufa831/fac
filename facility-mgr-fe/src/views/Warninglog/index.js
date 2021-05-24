import { defineComponent, ref,onMounted,unref } from 'vue';

import * as echarts from 'echarts';
import axios from 'axios';
import { del, post, get } from '@/helpers/request';
export default defineComponent({
  setup() {
    
    const warning = async() => {
      var warningChart = echarts.init(document.getElementById('warning'));
      post('/warning/count').then((res) => {
        warningChart.setOption({
          title: {
            text: '预警区局分布图'
          },
          legend: {
            data: ['预警量']
          },
         
          xAxis: {
            "axisLabel":{
              interval: 0
            },
            
            data: ['黄浦区局', '徐汇区局', '长宁区局', '静安区局', '普陀区局', '虹口区局', '杨浦区局', '闵行区局', '宝山区局', '嘉定区局', '金山区局', '松江区局', '青浦区局', '奉贤区局', '崇明区局', '浦东新区区局']
          },
          yAxis: {
            type: 'value',
            name: '告警数',
            max : 10,
            min: 0,
            // splitNumber : 2,
          },
          series: [{
            name: '区局',
            type: 'bar',
            data:res.data.data,
          }]
        });
      });
      
      
    };
    
    onMounted(async() => {
      warning();
    });

    return {
      
    };
  },

});