<template>
  <el-header height="48px" style="background-color: #a6e1f1">
    <el-breadcrumb separator-class="el-icon-arrow-right" style="line-height:3">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{routerItem}}</el-breadcrumb-item>
    </el-breadcrumb>
  </el-header>
</template>

<script>
export default {
  data() {
    return {
      routerItem: ""
    };
  },
  mounted() {
    let name = this.$route.name;
    switch (name) {
      case "Managemember":
        this.routerItem = "成员管理";
        break;
      case "Managenews":
        this.routerItem = "动态管理";
        break;
      case "Uploadnews":
        this.routerItem = "新闻撰写";
        break;
      case "Managecaptial":
        this.routerItem = "资产登记";
        break;
      case "Captialgraph":
        this.routerItem = "资产统计";
        break;
      case "Personalcenter":
        this.routerItem = "个人中心";
        break;
    }
  }
};
</script>

<style>
</style>