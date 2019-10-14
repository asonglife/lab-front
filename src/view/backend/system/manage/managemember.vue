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
    <el-table :data="tableData" style="width: 100%" :default-sort="{order: 'descending'}">
      <el-table-column type="selection" width="30" fixed></el-table-column>
      <el-table-column prop="name" label="姓名" width="120" fixed></el-table-column>
      <el-table-column prop="grade" label="年级" sortable width="120"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
      <el-table-column prop="tel" label="电话" width="180"></el-table-column>
      <el-table-column prop="address" label="地址" min-width="270"></el-table-column>
      <el-table-column label="操作" min-width="200">
        <template slot-scope="scope">
          <el-button size="mini" @click="editUser()">编辑</el-button>
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

    <el-drawer :visible.sync="drawer" size="400px" :before-close="handleClose">
      <adduser></adduser>
    </el-drawer>
  </div>
</template>

<script>
import Adduser from "view/backend/system/managecomponents/addUser.vue";
export default {
  data() {
    return {
      tableData: [
        {
          email: "494083286@qq.com",
          address: "上海市普陀区金沙江路 1518 弄",
          name: "王小虎",
          grade: "研一",
          tel: "13628315056"
        }
      ],
      drawer: false
    };
  },
  components: {
    Adduser
  },

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
      this.drawer = true;
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    }
  }
};
</script>




<style lang="stylus" scoped>
.pagination
  margin-top: 20px
</style>