<template>
  <el-menu
    :default-active="this.systemIndex"
    class="el-menu-vertical-demo"
    background-color="whitesmoke"
    @select="handleSelect"
  >
    <el-menu-item index="1">
      <i class="el-icon-location-outline"></i>
      <span slot="title">返回主页</span>
    </el-menu-item>
    <el-menu-item index="2">
      <i class="el-icon-user-solid"></i>
      <span slot="title">成员管理</span>
    </el-menu-item>
    <el-submenu index="3">
      <template slot="title">
        <i class="el-icon-notebook-1"></i>
        <span>资产管理</span>
      </template>

      <el-menu-item index="3-1" style="padding-left:4em">
        <i class="el-icon-document"></i>
        <span slot="title">资产登记</span>
      </el-menu-item>
      <el-menu-item index="3-2" style="padding-left:4em">
        <i class="el-icon-upload"></i>
        <span slot="title">资产统计</span>
      </el-menu-item>
    </el-submenu>
    <el-submenu index="4">
      <template slot="title">
        <i class="el-icon-notebook-1"></i>
        <span>新闻动态</span>
      </template>

      <el-menu-item index="4-1" style="padding-left:4em">
        <i class="el-icon-refresh-left"></i>
        <span slot="title">动态管理</span>
      </el-menu-item>
      <el-menu-item index="4-2" style="padding-left:4em">
        <i class="el-icon-upload"></i>
        <span slot="title">文章撰写</span>
      </el-menu-item>
    </el-submenu>
    <el-menu-item index="5">
      <i class="el-icon-magic-stick"></i>
      <span slot="title">个人中心</span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      systemIndex: "2"
    };
  },
  mounted() {
    let name = this.$route.name;
    switch (name) {
      case "Managemember":
        this.$router.replace({ name: "Managemember" });
        this.systemIndex = "2";
        break;
      case "Managenews":
        this.$router.replace({ name: "Managenews" });
        this.systemIndex = "4-1";
        break;
      case "Uploadnews":
        this.$router.replace({ name: "Uploadnews" });
        this.systemIndex = "4-2";
        break;
      case "Managecaptial":
        this.$router.replace({ name: "Managecaptial" });
        this.systemIndex = "3-1";
        break;
      case "Captialgraph":
        this.$router.replace({ name: "Captialgraph" });
        this.systemIndex = "3-2";
        break;
      case "Personalcenter":
        this.$router.replace({ name: "Personalcenter" });
        this.systemIndex = "5";
        break;
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      if (keyPath.length < 2) {
        this.systemIndex = keyPath.toString();
      } else {
        this.systemIndex = keyPath[1].toString();
      }
      this.$emit("system-router", keyPath);
    }
  }
};
</script>

<style>
</style>