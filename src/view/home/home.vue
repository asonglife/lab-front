<template>
  <div>
    <el-container>
      <el-header height="222px">
        <m-header></m-header>
      </el-header>
      <el-main>
        <mainpage></mainpage>
      </el-main>
      <el-footer height="100px">
        <m-footer></m-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Mainpage from "view/home/mainpage/mainpage.vue";
import MHeader from "view/home/header/header.vue";
import MFooter from "view/home/footer/footer.vue";
import GlOBAL from "api/global_variable.js";
export default {
  components: {
    Mainpage,
    MHeader,
    MFooter
  }
};
</script>

<style lang="stylus" scoped>
.el-container
  position: float
.el-header, .el-footer
  background-color: #ffffff
  color: #333
  text-align: center
  margin-left: 12%
  margin-right: 12%
  padding: 0
.el-main
  background-color: #ffffff
  color: #333
  margin-left: 12%
  margin-right: 12%
  padding: 31px
.el-footer
  background-color: #e9eef3
</style>