<template>
  <div>
    <img :src="imgSrc.src" />
    <el-menu mode="horizontal" :default-active="this.activeIndex" router>
      <el-menu-item v-for="item in leadList" :key="item.length" :index="item.name">{{item.leadItem}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import GlOBAL from "api/global_variable.js";
export default {
  data() {
    return {
      activeIndex: "/homepage",
      leadList: [
        {
          name: "/homepage",
          leadItem: "主页"
        },
        {
          name: "/news",
          leadItem: "新闻动态"
        },
        {
          name: "/members",
          leadItem: "成员力量"
        },
        {
          name: "/science",
          leadItem: "科研情况"
        },
        {
          name: "/backend",
          leadItem: "后台管理"
        }
      ],
      imgSrc: [
        {
          src: require("assets/img/logo.png")
        }
      ]
    };
  },
  mounted() {
    let name = this.$router.name;
    switch (name) {
      case "Homepage":
        this.activeIndex = GlOBAL.pathName.homepage;
        break;
      case "News":
        this.activeIndex = GlOBAL.pathName.news;
        break;
      case "Members":
        this.activeIndex = GlOBAL.pathName.members;
        break;
      case "Science":
        this.activeIndex = GlOBAL.pathName.science;
        break;
      case "Backend":
        this.activeIndex = GlOBAL.pathName.backend;
    }
  }
};
</script>

<style lang="stylus" scoped></style>