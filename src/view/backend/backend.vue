<template>
  <div>
    <el-container>
      <el-header height="81px">
        <system-header></system-header>
      </el-header>
      <el-container v-if="isRouterAlive">
        <el-aside width="200px">
          <system-aside @system-router="systemRouter"></system-aside>
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
  provide() {
    return {
      reload: this.reload
    };
  },
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    systemRouter(i) {
      let routerCase = i.toString();
      switch (routerCase) {
        case "1":
          this.$router.replace({ name: "Homepage" });
          break;
        case "3,3-1":
          this.$router.push({ name: "Managecaptial" });
          break;
        case "3,3-2":
          this.$router.push({ name: "Captialgraph" });
          break;
        case "4,4-1":
          this.$router.push({ name: "Managenews" });
          break;
        case "4,4-2":
          this.$router.push({ name: "Uploadnews" });
          break;
        case "5":
          this.$router.push({ name: "Personalcenter" });
          break;
        case "2":
          this.$router.replace({ name: "Managemember" });
          break;
      }
    },
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(() => {
        this.isRouterAlive = true;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.el-header
  color: #333
  text-align: center
.el-aside
  background-color: whitesmoke
  color: #333
  text-align: center
.el-main
  background-color: #ffffff
  color: #333
  text-align: center
  padding: 0
  height: 620px
</style>