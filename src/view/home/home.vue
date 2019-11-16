<template>
  <div>
    <el-container>
      <el-header height="190px">
        <m-header @change-router="changeRouter"></m-header>
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
  },
  methods: {
    changeRouter(e) {
      switch (e) {
        case GlOBAL.pathName.news:
          this.$router.push({ name: "News" });
          break;
        case GlOBAL.pathName.members:
          this.$router.push({ name: "Members" });
          break;
        case GlOBAL.pathName.science:
          this.$router.push({ name: "Science" });
          break;
        case GlOBAL.pathName.backend:
          if (this.user) {
            this.$router.push({ name: "Managemember" });
          } else {
            this.$message({
              type: "error",
              message: "请登录后再访问",
              showClose: true
            });
          }
          break;
        default:
          this.$router.push({ name: "Homepage" });
          break;
      }
    }
  },

  computed: {
    user() {
      let userInfo = this.$store.state.userInfo;
      for (let key in userInfo) {
        return true;
      }
      return false;
    }
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
  padding: 18px
  min-height: 470px
.el-footer
  background-color: #e9eef3
</style>