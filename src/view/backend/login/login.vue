<template>
  <div id="login-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <img :src="img" alt="home" id="login-img" @click="gotoHome()" />
        <p>登录后台管理</p>
      </div>
      <i id="login-logo" class="el-icon-user-solid"></i>
      <el-form :model="user" :rules="rules" ref="loginForm" status-icon>
        <el-form-item prop="name" class="input-container">
          <el-input placeholder="账户" v-model="user.name"></el-input>
        </el-form-item>
        <el-form-item prop="pass" class="input-container">
          <el-input placeholder="密码" v-model="user.pass" type="password"></el-input>
        </el-form-item>
        <el-button type="primary" plain @click="login" :loading="responseStatus">登录</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { postData } from "api/postData.js";
import md5 from "js-md5";
export default {
  data() {
    return {
      responseStatus: false,
      img: require("assets/img/title.jpg"),
      user: {
        name: "",
        pass: ""
      },
      rules: {
        name: [{ required: true, message: "用户名不能为空", trigger: "blur" }],
        pass: [{ required: true, message: "密码不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    gotoHome() {
      this.$router.push({ path: "/homepage" });
    },
    login() {
      let _this = this;
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.responseStatus = true;
          postData("http://47.103.210.8:8080/login", {
            username: _this.user.name,
            password: md5(_this.user.pass)
          })
            .then(res => {
              if (res.status === 200 && res.data.status === true) {
                _this.responseStatus = false;
                let token = res.headers.token;
                let userInfo = res.data;
                this.$store.dispatch("_setToken", token).then(() => {
                  let currentTime = new Date().getTime();
                  this.$store.dispatch("_setExpire", currentTime).then(() => {
                    this.$store.dispatch("_setUserInfo", userInfo).then(() => {
                      this.$notify({
                        type: "success",
                        message: "欢迎你，" + userInfo.name,
                        duration: 3000
                      });
                      this.$router.push({ name: "Managemember" });
                    });
                  });
                });
              } else {
                this.$message({
                  type: "error",
                  message: "密码或用户名错误",
                  duration: 3000
                });
                this.responseStatus = false;
              }
            })
            .catch(err => {
              this.responseStatus = false;
            });
        }
      });
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
.input-container
  margin: 20px auto
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