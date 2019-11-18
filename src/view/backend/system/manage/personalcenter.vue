<template>
  <div class="personal-container" v-loading="show">
    <router-bread></router-bread>
    <div class="adduser">
      <el-form ref="adduserform" :model="studentsData" label-width="100px" :rules="rules">
        <el-form-item label="照片" prop="photo">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            action
            :auto-upload="false"
            :on-change="onchange"
            accept="image/png, image/gif, image/jpg, image/jpeg"
          >
            <img v-if="studentsData.photo" :src="studentsData.photo" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name" placeholder>
          <el-input v-model="studentsData.name"></el-input>
        </el-form-item>
        <el-form-item label="学号/工号" prop="id" placeholder>
          <el-input v-model.number="studentsData.id"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="studentsData.education" placeholder="请选择学历">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="身份" prop="isTeacher">
          <el-radio-group v-model="studentsData.isTeacher">
            <el-radio label="1">老师</el-radio>
            <el-radio label="0">学生</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="地址" prop="address" auto-complete="on">
          <el-input v-model="studentsData.address"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email" auto-complete="on">
          <el-input v-model="studentsData.email"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="tel" auto-complete="on">
          <el-input v-model="studentsData.tel"></el-input>
        </el-form-item>
        <el-form-item label="个人经历" prop="experience">
          <el-input type="textarea" v-model="studentsData.experience"></el-input>
        </el-form-item>
        <el-form-item label="type" prop="type" v-show="false">
          <el-input v-model="studentsData.type"></el-input>
        </el-form-item>
        <div class="passchange">
          <span>修改密码：</span>
          <i class="el-icon-edit show-close" @click="changeShow=true"></i>
        </div>
        <el-form-item label="密码" prop="password" v-if="changeShow">
          <el-input type="password" v-model="studentsData.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="pass" auto-complete="off" v-if="changeShow">
          <el-input v-model="studentsData.pass" type="password"></el-input>
        </el-form-item>
        <div class="passchange" v-if="changeShow">
          收起
          <i class="el-icon-caret-top show-close" @click="changeShow=false"></i>
        </div>
        <el-button
          style="margin-left: 104px;margin-top:12px"
          class="submitclass"
          type="primary"
          size="mini"
          plain
          @click="submitData()"
          :loading="this.loading"
        >提交</el-button>
      </el-form>
    </div>
  </div>
</template>

<script>
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import { postData } from "api/postData.js";
import { getData } from "api/getData.js";
import md5 from "js-md5";
export default {
  components: {
    RouterBread
  },
  data() {
    var checktel = (rule, value, callback) => {
      const tel = /^1[3|4|5|7|8][0-9]{9}$/;
      if (!value) {
        return callback(new Error("电话号码不能为空"));
      }
      setTimeout(() => {
        if (!Number.isInteger(+value)) {
          callback(new Error("请输入数字值"));
        } else {
          if (tel.test(value)) {
            callback();
          } else {
            callback(new Error("电话号码格式不正确"));
          }
        }
      }, 100);
    };
    var checkEmail = (rule, value, callback) => {
      const mailReg = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/;
      if (!value) {
        return callback(new Error("邮箱不能为空"));
      }
      setTimeout(() => {
        if (mailReg.test(value)) {
          return callback();
        } else {
          return callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    var checkId = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请输入学号"));
      } else if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        return callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不小于6"));
      } else {
        if (this.studentsData.password !== "") {
          this.$refs.adduserform.validateField("pass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.studentsData.password) {
        callback(new Error("两次输入密码不一致!"));
      } else if (value.length < 6) {
        callback(new Error("密码长度不小于6"));
      } else {
        callback();
      }
    };
    return {
      studentsData: {
        photo: "",
        name: "",
        education: "",
        id: "",
        address: "",
        tel: "",
        email: "",
        experience: "",
        type: "",
        isTeacher: "0",
        pass: "",
        password: ""
      },
      rules: {
        photo: [{ required: true, message: "请上传个人照片", trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        id: [
          {
            required: true,
            validator: checkId,
            trigger: "change"
          }
        ],
        education: [
          { required: true, message: "请输入学历", trigger: "change" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        experience: [
          { required: true, message: "请输入个人经历", trigger: "blur" }
        ],
        tel: [{ required: true, validator: checktel, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur", required: true }],
        isTeacher: [{ required: true, message: "请选择身份", trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        pass: [{ validator: validatePass2, trigger: "blur" }]
      },
      loading: false,
      show: false,
      changeShow: false
    };
  },
  methods: {
    onchange(file, fileList) {
      let _this = this;
      let event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        _this.studentsData.photo = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },
    submitData() {
      this.$refs.adduserform.validate(valid => {
        if (valid) {
          console.log(this.studentsData.password);
          if (this.studentsData.password === undefined) {
            this.studentsData.password = "";
            this.studentsData.type = "update";
            this.studentsData.id = parseInt(this.studentsData.id);
            this.studentsData.isTeacher = parseInt(this.studentsData.isTeacher);
          } else {
            this.studentsData.password = md5(this.studentsData.password);
            this.studentsData.type = "update";
            this.studentsData.id = parseInt(this.studentsData.id);
            this.studentsData.isTeacher = parseInt(this.studentsData.isTeacher);
          }

          this.$confirm("确认提交？").then(() => {
            this.loading = true;
            this.show = true;
            postData(
              "http://47.103.210.8:8080/member_change",
              this.studentsData,
              {
                "Content-Type": "application/json"
              }
            )
              .then(res => {
                if (res.data.status == "update") {
                  this.loading = false;
                  this.getPersonalData();
                  this.$message({
                    message: "提交成功",
                    type: "success"
                  });
                } else {
                  this.loading = false;
                  this.show = false;
                  this.$message({
                    message: "提交失败",
                    type: "error"
                  });
                }
              })
              .catch(err => {
                this.loading = false;
                this.$message({
                  message: "提交失败",
                  type: "error"
                });
              });
          });
        }
      });
    },
    getPersonalData() {
      this.show = true;
      getData(
        "http://47.103.210.8:8080/get_members?id=" +
          this.$store.getters.getUserInfo.id
      ).then(res => {
        let data = res.data.members[0];
        this.studentsData = {
          photo: data.photo,
          name: data.name,
          education: data.education,
          id: data.id,
          address: data.address,
          tel: data.tel,
          email: data.email,
          experience: data.experience,
          isTeacher: data.isTeacher.toString()
        };
      });
      this.show = false;
    }
  },
  mounted() {
    this.getPersonalData();
  }
};
</script>
<style lang="stylus" scoped>
.adduser >>>.avatar-uploader .el-upload
  cursor: pointer
  position: relative
  overflow: hidden
  border: 1px dashed #d9d9d9
  border-radius: 6px
.adduser>>>.avatar-uploader .el-upload:hover
  border-color: #409EFF
.adduser>>>.avatar-uploader-icon
  font-size: 28px
  color: #8c939d
  width: 167px
  height: 167px
  line-height: 167px
  text-align: center
.adduser>>>.avatar
  width: 167px
  height: 167px
  display: block
.adduser
  width: 274px
  margin: 28px 0 50px 412px
.passchange
  text-align: right
  vertical-align: middle
  font-size: 14px
  color: #606266
  padding: 0 12px 0 0
  margin-right: 141px
  margin-bottom: 18px
.passchange>>>.show-close:hover
  color: #a6e1f1
</style>