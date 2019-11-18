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
import { getData } from "api/getData.js";
import url from "api/apiUrl.js";
export default {
  components: {},
  mounted() {
    this.getValue();
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
          data: []
        },
        series: [
          {
            type: "pie",
            radius: "65%",
            center: ["50%", "50%"],
            selectedMode: "single",
            data: [],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      },
      item: [],
      itemValue: []
    };
  },
  components: {
    RouterBread
  },
  methods: {
    initChart() {
      this.option.series[0].data = this.itemValue;
      this.option.legend.data = this.item;
      let myChart = echarts.init(document.getElementById("main"));
      myChart.setOption(this.option);
    },
    getValue() {
      getData(url.getCaptialInf).then(res => {
        let moneys = res.data.moneys;
        for (let keys in moneys) {
          this.item.push(keys);
          this.itemValue.push({
            value: moneys[keys],
            name: keys
          });
        }
      });
    }
  },
  watch: {
    itemValue() {
      this.initChart();
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
