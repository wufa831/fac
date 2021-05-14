async getdata(){
  this.$echarts.init(document.getElementById("myChart2")).showLoading();
  await this.$axios.get("api/Base/GetRwsForNow").then((response) => {
    //console.log(response);
    if (response.data.result == "1") {
      //let contacts = response.data.seriesList;
      //this.pieData.push(contacts);
      //this.temp = contacts;
      // console.log(response)
      this.$echarts.init(document.getElementById("myChart2")).hideLoading();
      this.$echarts.init(document.getElementById("myChart2")).setOption(
        {
          title: { text: "任务情况" },
          tooltip: {},
          legend: {
            data: response.data.legendList,
          },
          //backgroundColor: "#2c343c", //设置全局背景颜色
          textStyle: {
            //全局文本样式
            // color: "rgba(255, 255, 255, 0.3)",
          },
          //设置视觉引导线
          lineStyle: {
            color: "rgba(255, 255, 255, 0.3)",
          },
          itemStyle: {
            //高亮样式
            emphasis: {
              //color: "#c23531",
              shadowBlur: 200,
              shadowColor: "rgba(0, 0, 0, 0.5)",
            },
          },
          series: {
            type: "pie",
            radius: "55%",
            //roseType: "angle", //南丁格尔图
            //this.pieData,

            data: response.data.seriesList,
            //[
            // { value: 2, name: "启用" },
            // { value: 1, name: "暂停" },
            //],
          },
        },
        true
      );
    } else {
      this.$ant_message.error(response.data.msg);
    }
  });
}