<template>
  <div>
    <el-container>
      <el-header height="222px">
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
import GlOBAL from "api/global_variable.js";
export default {
  components: {
    Mainpage,
    MHeader,
    MFooter
  }
  // methods: {
  //   changeTab(e) {
  //     switch (e) {
  //       case GlOBAL.pathName.news:
  //         this.$router.push({ name: "News" });
  //         console.log(this.$router);
  //         break;
  //       case GlOBAL.pathName.members:
  //         this.$router.push({ name: "Members" });
  //         break;
  //       case GlOBAL.pathName.science:
  //         this.$router.push({ name: "Science" });
  //         break;
  //       case GlOBAL.pathName.backend:
  //         this.$router.push({ name: "Backend" });
  //         break;
  //       case GlOBAL.pathName.homepage:
  //         this.$router.push({ name: "Homepage" });
  //         break;
  //     }
  //   }
  // }
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
  padding: 0
.el-main
  background-color: #ffffff
  color: #333
  text-align: center
  height: 700px
  margin-left: 100px
  margin-right: 100px
</style>