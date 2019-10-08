<template>
  <div>
    <div id="lab-name">
      <img :src="img" alt="home" id="lab-img" />
      <span id="lab-font">重庆邮电大学信息网络实验室</span>
      <login-state></login-state>
    </div>
    <el-menu
      mode="horizontal"
      :default-active="this.activeIndex"
      background-color="#a6e1f1"
      @select="handleSelect"
    >
      <el-menu-item v-for="item in leadList" :key="item.length" :index="item.name">{{item.leadItem}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
import GlOBAL from "api/global_variable.js";
import loginState from "view/backend/login/loginState.vue";
export default {
  data() {
    return {
      activeIndex: "/homepage",
      img: require("assets/img/title.jpg"),
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
      ]
    };
  },
  components: {
    loginState
  },
  mounted() {
    let name = this.$router.name;
    switch (name) {
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
        break;
      default:
        this.$router.replace("/homepage");
    }
  },
  methods: {
    handleSelect(keyPath) {
      this.$emit("change-router", keyPath);
    }
  }
};
</script>

<style lang="stylus" scoped>
#lab-img
  width: 64px
  height: 64px
  float: left
  margin: 32px
#lab-name
  display: block
  height: 100px
  margin-bottom: 45px
#lab-font
  text-align: center
  font-size: 24px
  font-family: sans-serif
  color: #5184ca
  display: block
  float: left
  margin-top: 53px
</style>