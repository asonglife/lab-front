<template>
  <div>
    <el-container>
      <el-header height="100px">
        <m-header></m-header>
      </el-header>
      <el-main>
        <mainpage></mainpage>
      </el-main>
      <el-footer>
        <m-footer></m-footer>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import Mainpage from "view/home/mainpage/mainpage.vue";
import MHeader from "view/home/header/header.vue";
import MFooter from "view/home/footer/footer.vue";
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
  margin-left: 100px
  margin-right: 100px
.el-main
  background-color: #ffffff
  color: #333
  text-align: center
  height: 700px
  margin-left: 100px
  margin-right: 100px
</style>