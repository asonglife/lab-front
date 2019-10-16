<template>
  <el-drawer
    :visible="drawer"
    size="400px"
    :before-close="handleClose"
    class="form-drawer"
    :wrapperClosable="false"
    :destroy-on-close="true"
  >
    <div class="adduser">
      <el-form ref="adduserform" :model="studentsData" label-width="100px" :rules="rules">
        <el-form-item label="照片" prop="photo" v-show="isEdit">
          <el-upload
            class="avatar-uploader"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            action
            :before-upload="beforeAvatarUpload"
            :on-change="onchange"
            :auto-upload="false"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name" placeholder>
          <el-input v-model="studentsData.name"></el-input>
        </el-form-item>
        <el-form-item label="学号" prop="studentsId" placeholder>
          <el-input v-model="studentsData.studentsId"></el-input>
        </el-form-item>
        <el-form-item label="学历" prop="education">
          <el-autocomplete v-model="studentsData.education" :fetch-suggestions="querySearch"></el-autocomplete>
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
        <el-form-item label="个人经历" prop="experience" v-show="isEdit">
          <el-input type="textarea" v-model="studentsData.experience"></el-input>
        </el-form-item>
        <el-button class="submitclass" type="primary" plain @click="submitData">提交</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
import { getData } from "api/getData.js";
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
          callback();
        } else {
          callback(new Error("请输入正确的邮箱格式"));
        }
      }, 100);
    };
    return {
      imageUrl: "",
      studentsData: {
        name: "",
        education: "",
        studentsId: "",
        address: "",
        tel: "",
        email: "",
        experience: ""
      },
      rules: {
        photo: [{ required: true, trigger: "blur" }],
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        studentsId: [{ required: true, trigger: "blur" }],
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
      selectedu: [],
      drawer: false,
      isEdit: true,
      subtimeOut: ""
    };
  },
  mounted() {
    this.selectedu = [{ value: "本科" }, { value: "硕士" }, { value: "博士" }];
  },
  methods: {
    querySearch(queryString, cb) {
      var selectedu = this.selectedu;
      cb(selectedu);
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    },
    onchange(file, fileList) {
      let _this = this;
      let event = event || window.event;
      var file = event.target.files[0];
      var reader = new FileReader();
      reader.onload = function(e) {
        _this.imageUrl = e.target.result; //将图片路径赋值给src
      };
      reader.readAsDataURL(file);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    submitData() {
      this.$confirm("确认提交？").then(() => {
        if (this.rowIndex >= 0) {
          this.saveEditUser();
          getData(
            "https://jsonplaceholder.typicode.com/posts/",
            this.studentsData
          ).then(res => {
            this.subtimeOut = res.request.timeout;
            console.log(this.subtimeOut);
            console.log(res);
          });
        } else {
          this.addRow();
          getData(
            "https://jsonplaceholder.typicode.com/posts/",
            this.studentsData
          ).then(res => {
            this.subtimeOut = res.request.timeout;
            console.log(res);
          });
        }
        setTimeout(() => {
          this.drawer = false;
          this.isEdit = true;
          if (this.$refs.adduserform !== undefined) {
            this.$refs.adduserform.resetFields();
          }
          this.imageUrl = "";
        }, this.subtimeOut + 100);
      });
    },
    handleClose() {
      this.$confirm("确认关闭？会失去未保存的工作").then(() => {
        this.drawer = false;
        this.isEdit = true;
        if (this.$refs.adduserform !== undefined) {
          this.$refs.adduserform.resetFields();
        }
        this.imageUrl = "";
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
  font-size: 28px
  color: #8c939d
  width: 178px
  height: 178px
  line-height: 178px
  text-align: center
.avatar
  width: 178px
  height: 178px
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
  margin-left: 55%
  margin-top: 12px
.adduser>>>.el-upload
  border: solid 0.5px greenyellow
</style>