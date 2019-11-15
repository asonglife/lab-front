<template>
  <div>
    <div class="login" v-show="this.loginState()">
      <span>当前身份：游客 |</span>
      <span class="login-text" @click="goLogin()">登录</span>
    </div>
    <div class="login" v-show="!this.loginState()">
      <span>当前身份：{{username}} |</span>
      <span class="login-text" @click="loginOut()">注销</span>
    </div>
  </div>
</template>

<script>
import { isNullObj } from "assets/js/isNullObj.js";
export default {
  data() {
    return {
      username: this.$store.getters.getUserInfo.name
    };
  },
  methods: {
    loginState() {
      let userInfo = this.$store.getters.getUserInfo;
      return isNullObj(userInfo);
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    loginOut() {
      this.$store.dispatch("_removeExpire").then(() => {
        this.$router.push("/login");
      });
    }
  },
  mounted() {
    this.loginState();
  }
};
</script>

<style lang="stylus" scoped>
.login
  float: right
  margin-top: 118px
  margin-right: 10px
  font-size: 12px
.login-text:hover
  text-decoration-line: underline
  color: #a6e1f1
  cursor: pointer
</style>