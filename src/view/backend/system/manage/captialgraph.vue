<template>
  <div>
    <router-bread></router-bread>
    <el-main>
      <div class="box-container">
        <div id="main" class="box"></div>
      </div>
    </el-main>
  </div>
</template>
<script>
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import echarts from "echarts";
export default {
  components: {},
  mounted() {
    this.initChart();
  },
  data() {
    return {
      option: {
        title: {
          text: "资产统计",
          subtext: "虚构数据",
          left: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          // orient: 'vertical',
          // top: 'middle',
          bottom: 10,
          left: "center",
          data: ["电脑", "服务器", "硬件器材"]
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [
              { value: 1548, name: "电脑" },
              { value: 535, name: "硬件器材" },
              { value: 510, name: "服务器" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      }
    };
  },
  components: {
    RouterBread
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    }
  }
};
</script>
<style lang="stylus" scoped>
.box
  width: 400px
  height: 400px
.box-container
  padding-left: 34%
  padding-bottom: 50px
</style>
