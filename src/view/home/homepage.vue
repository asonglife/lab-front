<template>
  <div id="home" v-loading="loading">
    <h3 class="lab-item">实验室简介</h3>
    <swiper :labImg="this.labImage"></swiper>
    <p class="lab-content">{{labIntroduction}}</p>
    <h3 class="lab-item">主要方向</h3>
    <ul style="padding:0">
      <li class="lab-direction" v-for="(item,index) in labDirection" :key="index">
        <i class="el-icon-s-opportunity" style="color:gold"></i>
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
import Swiper from "view/home/swiper.vue";
export default {
  data() {
    return {
      labIntroduction: [],
      labDirection: [],
      labImage: [],
      loading: false
    };
  },
  components: {
    Swiper
  },
  mounted() {
    this.getLabMessage();
  },
  methods: {
    getLabMessage() {
      this.loading = true;
      getData("http://47.103.210.8:8080/json_lab").then(res => {
        this.labIntroduction = res.data.labIntroduction;
        this.labDirection = res.data.labDirection;
        this.labImage = res.data.labImage;
        this.loading = false;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.lab-item
  text-align: left
  color: #333
  margin-bottom: 16px
  margin-top: 30px
.lab-content
  padding: 0px 0px 8px
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
  padding: 1em
  text-indent: 1em
.lab-direction
  list-style: none
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
#home
  margin-bottom: 49px
</style>