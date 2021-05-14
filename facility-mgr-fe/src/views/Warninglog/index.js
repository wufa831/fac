import { defineComponent, ref,onMounted,unref } from 'vue';
import { message } from 'ant-design-vue';
import { warning } from '@/service';
import { result, getmonth } from '@/helpers/utils';
import * as echarts from 'echarts';
import axios from 'axios';
import { del, post, get } from '@/helpers/request';
export default defineComponent({
  setup() {

//获取设备列表
const arealist = ref(['黄浦区局','徐汇区局','长宁区局','静安区局','普陀区局','虹口区局','杨浦区局','闵行区局','宝山区局','嘉定区局','金山区局','松江区局','青浦区局','奉贤区局','崇明区局','浦东新区区局']);
    var list2 = ref([]);
    // const getwarningData = async () => {
    //   var list3 = [];
    //   const res1 = await warning.warningcount();
    //   list3 = res1.data.data;console.log(list3);
    //   list2.value = res1.data.data;
      
    //   result(res1)
    //     .success(({ msg }) => {
    //       message.success(msg);
    //     });
    // };
    
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
    // var option = {
    //         title: {
    //             text: 'ECharts 入门示例'
    //         },
    //         legend: {
    //             data:['销量']
    //         },
    //         xAxis: {
    //             data: ['黄浦区局','徐汇区局','长宁区局','静安区局','普陀区局','虹口区局','杨浦区局','闵行区局','宝山区局','嘉定区局','金山区局','松江区局','青浦区局','奉贤区局','崇明区局','浦东新区区局']
    //         },
    //         yAxis: {},
    //         series: [{
    //             name: '销量',
    //             type: 'bar',
    //             data: [2, 2, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1],
    //         }]
    //       };
    // var warningChart = echarts.init(document.getElementById('warning'));
    onMounted(async() => {
      // await getwarningData();
      warning();
      
  
      
    });

    return {
      
    };
  },

});