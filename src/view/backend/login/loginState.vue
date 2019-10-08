<template>
  <div>
    <div class="login" v-show="!this.loginState()">
      <span>当前身份：游客 |</span>
      <span class="login-text" @click="goLogin()">登录</span>
    </div>
    <div class="login" v-show="this.loginState()">
      <span>当前身份：{{username}} |</span>
      <span class="login-text" @click="loginOut()">注销</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.userInfo.name
    };
  },
  methods: {
    loginState() {
      let userInfo = this.$store.state.userInfo;
      for (let key in userInfo) {
        return true;
      }
      return false;
    },
    goLogin() {
      this.$router.push({ name: "Login" });
    },
    loginOut() {
      this.$store.dispatch("logout").then(() => {
        this.$router.replace("/login");
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