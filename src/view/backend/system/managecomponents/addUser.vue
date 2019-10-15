<template>
  <el-drawer :visible.sync="drawer" size="400px" :before-close="handleClose" class="form-drawer">
    <div class="adduser">
      <el-form ref="adduserform" :model="studentsData" label-width="100px" :rules="rules">
        <el-form-item label="照片">
          <el-upload
            class="avatar-uploader"
            action="https://jsonplaceholder.typicode.com/posts/"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="studentsData.name"></el-input>
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
        <el-form-item label="个人经历" prop="experience">
          <el-input type="textarea" v-model="studentsData.experience"></el-input>
        </el-form-item>
        <el-button class="submitclass" type="primary" plain @click="submitData">提交</el-button>
      </el-form>
    </div>
  </el-drawer>
</template>

<script>
export default {
  props: {
    addRow: {
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
        address: "",
        tel: "",
        email: "",
        experience: ""
      },
      rules: {
        name: [{ required: true, message: "请输入姓名", trigger: "blur" }],
        education: [
          { required: true, message: "请输入学历", trigger: "change" }
        ],
        address: [{ required: true, message: "请输入地址", trigger: "blur" }],
        experience: [
          { required: true, message: "请输入个人经历", trigger: "blur" },
          { min: 50, message: "不少于50字", trigger: "blur" }
        ],
        tel: [{ required: true, validator: checktel, trigger: "blur" }],
        email: [{ validator: checkEmail, trigger: "blur", required: true }]
      },
      selectedu: [],
      drawer: false
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
        this.$store.dispatch("adduser", this.studentsData).then(() => {
          this.addRow();
          this.drawer = false;
          this.studentsData = {
            name: "",
            education: "",
            address: "",
            tel: "",
            email: "",
            experience: ""
          };
        });
      });
    },
    handleClose() {
      this.$confirm("确认关闭？会失去未保存的工作").then(() => {
        this.drawer = false;
        this.studentsData = {
          name: "",
          education: "",
          address: "",
          tel: "",
          email: "",
          experience: ""
        };
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