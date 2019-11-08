<template>
  <el-drawer
    :visible.sync="drawer"
    size="400px"
    :before-close="handleClose"
    class="form-drawer"
    :wrapperClosable="false"
    :destroy-on-close="true"
  >
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
            <i v-else class="el-icon-upload avatar-uploader-icon">上传照片</i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name" placeholder>
          <el-input v-model="studentsData.name"></el-input>
        </el-form-item>
        <el-form-item label="学号/工号" prop="id" placeholder>
          <el-input v-model="studentsData.id"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-select v-model="studentsData.education" placeholder="请选择学历">
            <el-option label="本科" value="本科"></el-option>
            <el-option label="硕士" value="硕士"></el-option>
            <el-option label="博士" value="博士"></el-option>
          </el-select>
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
        <el-button
          class="submitclass"
          type="primary"
          plain
          @click="submitData()"
          :loading="this.loading"
        >提交</el-button>
        <el-button @click="resetForm()">重置</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { postData } from "api/postData.js";
export default {
  props: {
    addRow: {
      type: Function,
      default: null
    },
    rowIndex: {
      type: Number,
      default: null
    },
    saveEditUser: {
      type: Function,
      default: null
    }
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
    return {
      studentsData: {
        photo: "",
        name: "",
        education: "",
        id: "",
        address: "",
        tel: "",
        email: "",
        experience: ""
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
        email: [{ validator: checkEmail, trigger: "blur", required: true }]
      },
      drawer: false,
      loading: false
    };
  },
  mounted() {
    this.clearForm();
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
          this.$confirm("确认提交？").then(() => {
            this.loading = true;
            postData(
              "http://47.103.210.8:8080/member_change",
              this.studentsData,
              {
                "Content-Type": "application/json"
              }
            )
              .then(res => {
                console.log(res);
                this.loading = false;
                this.afterRespon(res.data.status);
              })
              .catch(err => {
                this.loading = false;
              });
          });
        }
      });
    },
    afterRespon(value) {
      this.drawer = false;
      if (this.rowIndex >= 0 && value == "update") {
        this.saveEditUser();
        this.$message({
          message: "编辑成功",
          type: "success"
        });
        this.clearForm();
      } else if (this.rowIndex < 0 && value == "insert") {
        this.addRow();
        this.$message({
          message: "提交成功",
          type: "success"
        });
        this.clearForm();
      }
    },
    handleClose() {
      this.$confirm("确认关闭？会失去未保存的工作").then(() => {
        this.clearForm();
        this.drawer = false;
      });
    },
    resetForm() {
      this.$confirm("确认重置？重置后会失去您填写的所有信息").then(() => {
        this.clearForm();
      });
    },
    clearForm() {
      this.$nextTick(() => {
        if (this.$refs.adduserform !== undefined) {
          this.$refs.adduserform.resetFields();
          this.imageUrl = "";
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.avatar-uploader .el-upload
  border: 1px dashed #d9d9d9
  border-radius: 6px
  cursor: pointer
  position: relative
  overflow: hidden
.avatar-uploader .el-upload:hover
  border-color: #409eff
.avatar-uploader-icon
  font-size: 16px
  color: #8c939d
  width: 150px
  height: 150px
  line-height: 150px
  text-align: center
.avatar
  width: 150px
  height: 150px
  display: block
.adduser
  display: flex
  align-items: center
  justify-content: center
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  width: 400px
  background: whitesmoke
.submitclass
  margin-left: 41%
  margin-top: 12px
.adduser>>>.el-upload
  border: dashed 1px #99a9bf
</style>