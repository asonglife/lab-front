<template>
  <div class="managemember">
    <routerbread></routerbread>
    <el-main>
      <div class="toolbar" style="float:right;">
        <el-form :inline="true" size="small">
          <el-form-item>
            <el-input placeholder="姓名"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="findUser()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <auth-button label="新增" type="success" @click="addUser()"></auth-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table :data="tableData" style="width: 100%" :stripe="true" header-align="center" border>
        <el-table-column type="selection" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="studentsId" label="学号" width="180"></el-table-column>
        <el-table-column prop="education" label="学历" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :show-overflow-tooltip="true" width="260"></el-table-column>
        <el-table-column label="操作" min-width="180">
          <template slot-scope="scope">
            <auth-button
              @click="editUser(scope.$index,tableData)"
              label="编辑"
              style="margin-right: 4px"
            ></auth-button>
            <auth-button type="danger" @click="deleteUser(scope.$index,tableData)" label="删除"></auth-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <div style="float:left;">
          <auth-button size="mini" type="danger" label="批量删除"></auth-button>
        </div>
        <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
      </div>
    </el-main>
    <adduser :addRow="addRow" :rowIndex="rowIndex" :saveEditUser="saveEditUser" ref="adduser"></adduser>
  </div>
</template>

<script>
import Adduser from "view/backend/system/managecomponents/addUser.vue";
import Routerbread from "view/backend/system/managecomponents/routerbread.vue";
import AuthButton from "view/backend/system/managecomponents/authbutton.vue";
export default {
  data() {
    return {
      tableData: [
        {
          name: "ccc"
        }
      ],
      rowIndex: -1
    };
  },
  components: {
    Adduser,
    Routerbread,
    AuthButton
  },
  mounted() {},
  methods: {
    deleteUser(index, rowdata) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.tableData.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    addUser() {
      this.$refs.adduser.drawer = true;
    },
    editUser(index, rowdata) {
      this.rowIndex = index;
      this.$refs.adduser.drawer = true;
      this.$refs.adduser.studentsData = {
        photo: rowdata[index].photo,
        name: rowdata[index].name,
        education: rowdata[index].education,
        studentsId: rowdata[index].studentsId,
        address: rowdata[index].address,
        tel: rowdata[index].tel,
        email: rowdata[index].email,
        experience: rowdata[index].experience
      };
    },
    saveEditUser() {
      this.$set(this.tableData, this.rowIndex, {
        photo: this.$refs.adduser.studentsData.photo,
        name: this.$refs.adduser.studentsData.name,
        education: this.$refs.adduser.studentsData.education,
        studentsId: this.$refs.adduser.studentsData.studentsId,
        address: this.$refs.adduser.studentsData.address,
        tel: this.$refs.adduser.studentsData.tel,
        email: this.$refs.adduser.studentsData.email,
        experience: this.$refs.adduser.studentsData.experience
      });
      this.rowIndex = -1;
    },
    addRow() {
      this.tableData.push({
        photo: this.$refs.adduser.studentsData.photo,
        name: this.$refs.adduser.studentsData.name,
        education: this.$refs.adduser.studentsData.education,
        studentsId: this.$refs.adduser.studentsData.studentsId,
        address: this.$refs.adduser.studentsData.address,
        tel: this.$refs.adduser.studentsData.tel,
        email: this.$refs.adduser.studentsData.email,
        experience: this.$refs.adduser.studentsData.experience
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.pagination
  margin-top: 20px
.form-drawer >>>.el-drawer__close-btn
  z-index: 200
</style>