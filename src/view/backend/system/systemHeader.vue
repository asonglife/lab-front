<template>
  <div class="header-container">
    <div class="system-name">
      <span class="system-font">
        <i class="el-icon-s-custom"></i>重庆邮电大学信息网络实验室后台管理系统
      </span>
      <login-state class="system-state"></login-state>
    </div>
  </div>
</template>

<script>
import loginState from "view/backend/login/loginState.vue";
export default {
  data() {
    return {
      img: require("assets/img/title.jpg")
    };
  },
  components: {
    loginState
  }
};
</script>

<style lang="stylus" scoped>
.system-name
  display: block
  height: 100px
  margin-bottom: 45px
.system-font
  text-align: center
  font-size: 24px
  font-family: sans-serif
  color: #5184ca
  display: block
  float: left
  margin-top: 25px
.system-name >>> .login
  margin-top: 8px
.el-icon-s-custom
  padding-right: 6px
</style>
