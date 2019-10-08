<template>
  <div>
    <el-container>
      <el-header height="91px">
        <system-header></system-header>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <system-aside></system-aside>
        </el-aside>
        <el-main>
          <system-main></system-main>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import systemHeader from "view/backend/system/systemHeader.vue";
import systemAside from "view/backend/system/systemAside.vue";
import systemMain from "view/backend/system/systemMain.vue";
export default {
  components: {
    systemHeader,
    systemAside,
    systemMain
  },
  data() {
    return {};
  }
};
</script>

<style lang="stylus" scoped>
.el-header
  background-color: #ffffff
  color: #333
  text-align: center
.el-aside
  background-color: #D3DCE6
  color: #333
  text-align: center
.el-main
  background-color: #E9EEF3
  color: #333
  text-align: center
</style>