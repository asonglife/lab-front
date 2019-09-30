<template>
  <div id="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img :src="img" alt="home" id="login-img" @click="gotoHome()" />
        <p>登录后台管理</p>
      </div>
      <i id="login-logo" class="el-icon-user-solid"></i>
      <el-input placeholder="账户"></el-input>
      <el-input placeholder="密码"></el-input>
      <el-button type="primary" plain>登录</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img: require("assets/img/title.jpg")
    };
  },
  mounted() {
    gotoHome;
  },
  methods: {
    gotoHome() {
      this.$router.push({ path: "/homepage" });
    }
  }
};
</script>

<style lang="stylus" scoped>
.box-card
  text-align: center
.clearfix:before, .clearfix:after
  display: table
  content: ''
.clearfix:after
  clear: both
.box-card
  width: 480px
  height: 480px
#login-container
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
.el-input
  margin: 40px auto
  width: 200px
  display: block
#login-logo
  display: block
  font-size: 35px
  margin: 5px auto
#login-img
  width: 64px
  height: 64px
  float: left
#login-img:hover
  cursor: pointer
.clearfix p
  font-size: 20px
  color: #5184ca
  padding-right: 14%
#login-container >>> .el-button--primary.is-plain
  width: 180px
</style>