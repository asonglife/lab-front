<template>
  <div class="container">
    <div id="main" class="box"></div>
  </div>
</template>
<script>
import echarts from "echarts";
export default {
  components: {},
  mounted() {
    this.initChart();
  },
  data() {
    return {};
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption({
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            data: [
              { value: 235, name: "视频广告" },
              { value: 274, name: "联盟广告" },
              { value: 310, name: "邮件营销" },
              { value: 335, name: "直接访问" },
              { value: 400, name: "搜索引擎" }
            ]
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
.container {
  position: relative;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-around;
}
.box {
  width: 600px;
  height: 600px;
  border: 2px solid #000;
}
</style>