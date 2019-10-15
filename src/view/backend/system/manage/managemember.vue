<template>
  <div>
    <p style="color:#a6e1f1;text-align:left">成员管理</p>
    <el-slider disabled :show-tooltip="false"></el-slider>
    <div class="toolbar" style="float:left; padding:18px;">
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="findUser()">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="addUser()">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      style="width: 100%"
      :default-sort="{order: 'descending'}"
      :stripe="true"
      header-align="center"
    >
      <el-table-column type="selection" width="70"></el-table-column>
      <el-table-column prop="name" label="姓名" width="100"></el-table-column>
      <el-table-column prop="studentsId" label="学号" sortable width="180"></el-table-column>
      <el-table-column prop="education" label="学历" width="100"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" :show-overflow-tooltip="true" width="260"></el-table-column>
      <el-table-column label="操作" width="180">
        <template slot-scope="scope">
          <el-button size="mini" @click="editUser(scope.$index,tableData)">编辑</el-button>
          <el-button size="mini" type="danger" @click="deleteUser(scope.$index,tableData)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div style="float:left;">
        <el-button size="mini" type="danger">批量删除</el-button>
      </div>
      <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
    </div>
    <adduser :addRow="addRow" :rowIndex="rowIndex" :saveEditUser="saveEditUser" ref="adduser"></adduser>
  </div>
</template>

<script>
import Adduser from "view/backend/system/managecomponents/addUser.vue";
export default {
  data() {
    return {
      tableData: [],
      rowIndex: -1
    };
  },
  components: {
    Adduser
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
      console.log(typeof this.rowIndex);
      this.$refs.adduser.drawer = true;
      this.$refs.adduser.isEdit = false;
      this.$refs.adduser.studentsData = {
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
        name: this.$refs.adduser.studentsData.name,
        education: this.$refs.adduser.studentsData.education,
        studentsId: this.$refs.adduser.studentsData.studentsId,
        address: this.$refs.adduser.studentsData.address,
        tel: this.$refs.adduser.studentsData.tel,
        email: this.$refs.adduser.studentsData.email,
        experience: this.$refs.adduser.studentsData.experience
      });

      //   name:this.$refs.adduser.studentsData.name,
      //   education: this.$refs.adduser.studentsData.education,
      //   studentsId: this.$refs.adduser.studentsData.studentsId,
      //   address: this.$refs.adduser.studentsData.address,
      //   tel: this.$refs.adduser.studentsData.tel,
      //   email: this.$refs.adduser.studentsData.email,
      //   experience: this.$refs.adduser.studentsData.experience
      // });
      console.log(this.tableData[this.rowIndex]);
      this.rowIndex = -1;
    },
    addRow() {
      this.tableData.push({
        name: this.$store.state.studentsData.name,
        education: this.$store.state.studentsData.education,
        studentsId: this.$store.state.studentsData.studentsId,
        address: this.$store.state.studentsData.address,
        tel: this.$store.state.studentsData.tel,
        email: this.$store.state.studentsData.email,
        experience: this.$store.state.studentsData.experience
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