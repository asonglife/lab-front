<template>
  <div id="#home">
    <h3 class="lab-item">实验室简介</h3>
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
export default {
  data() {
    return {
      labIntroduction: "",
      labDirection: ""
    };
  },
  computed: {
    httpErr() {
      return this.$store.state.httpErr;
    }
  },
  mounted() {
    this.getLabMessage();
  },
  methods: {
    getLabMessage() {
      getData("lab.json").then(res => {
        this.labIntroduction = res.data.labIntroduction;
        this.labDirection = res.data.labDirection;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.lab-item
  text-align: left
  color: #333
.lab-content
  margin: 8px 0px
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
</style>