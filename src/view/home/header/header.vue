<template>
  <div>
    <img :src="imgSrc.src" />
    <el-menu mode="horizontal" default-active="this.$route.path" router>
      <el-menu-item v-for="item in leadList" :key="item.length" :index="item.name">{{item.leadItem}}</el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
  }
};
</script>

<style lang="stylus" scoped></style>