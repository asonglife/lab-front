<template>
  <div class="managemember">
    <router-bread></router-bread>
    <el-main>
      <div class="toolbar" style="float:right;">
        <el-form :inline="true" size="small" ref="findForm" :model="foundData">
          <el-form-item prop="id">
            <el-input placeholder="学号/工号" v-model="foundData.id"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" type="primary" @click="findUser()">查询</el-button>
          </el-form-item>
          <el-form-item>
            <auth-button label="新增" type="success" @click="addUser()"></auth-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        header-align="center"
        border
        v-loading="loading"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="70"></el-table-column>
        <el-table-column prop="name" label="姓名" width="100"></el-table-column>
        <el-table-column prop="id" label="学号/工号" width="180"></el-table-column>
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
          <auth-button
            size="mini"
            type="danger"
            label="批量删除"
            v-if="this.mulDeleteVisi"
            @click="mulDelete()"
          ></auth-button>
        </div>
        <el-pagination
          :page-size="pageSize"
          layout="prev, pager, next, jumper"
          :current-page.sync="pageNum"
          :total="totalSize"
          @current-change="handleCurrentChange"
        ></el-pagination>
      </div>
    </el-main>
    <adduser :addRow="addRow" :rowIndex="rowIndex" :saveEditUser="saveEditUser" ref="adduser"></adduser>
  </div>
</template>

<script>
import Adduser from "view/backend/system/managecomponents/addUser.vue";
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import AuthButton from "view/backend/system/managecomponents/authbutton.vue";
import { getData } from "api/getData.js";
import { postData } from "api/postData.js";
export default {
  data() {
    return {
      tableData: [],
      rowIndex: -1,
      pageSize: 7,
      totalSize: 0,
      pageNum: 1,
      loading: true,
      foundData: {
        id: ""
      },
      mulDeleteVisi: false,
      mulSelection: [],
      muldeleId: []
    };
  },
  components: {
    Adduser,
    RouterBread,
    AuthButton
  },
  mounted() {
    this.handleCurrentChange();
  },
  methods: {
    deleteUser(index, rowdata) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postData(
            "http://47.103.210.8:8080/member_change",
            {
              id: rowdata[index].id,
              type: "delete"
            },
            {
              "Content-Type": "application/json"
            }
          )
            .then(res => {
              if (res.data.status == "delete") {
                this.addRow();
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    handleSelectionChange(val) {
      console.log(val);
      this.mulDeleteVisi = true;
      this.mulSelection = val;
      if (this.mulSelection.length == 0) {
        this.mulDeleteVisi = false;
      }
    },
    mulDelete() {
      let _this = this;
      this.$confirm("此操作将永久删除大量数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        _this.mulSelection.forEach(el => {
          _this.muldeleId.push(el.id);
        });
        postData(
          "http://47.103.210.8:8080/member_change",
          {
            id: _this.muldeleId,
            type: "delete"
          },
          {
            "Content-Type": "application/json"
          }
        );
      });
    },
    findUser() {
      this.loading = true;
      getData(
        "http://47.103.210.8:8080/get_members?id=" + this.foundData.id
      ).then(res => {
        console.log(res);
        this.loading = false;
        if (res.status === 200) {
          this.$refs.findForm.resetFields();
          let members = res.data.members;
          if (members.length > 0) {
            this.tableData = [];
            this.tableData.push({
              photo: members[0].photo,
              name: members[0].name,
              education: members[0].education,
              id: members[0].id,
              address: members[0].address,
              tel: members[0].tel,
              email: members[0].email,
              experience: members[0].experience
            });
          } else {
            this.tableData = [];
          }
        }
      });
    },
    addUser() {
      this.$refs.adduser.drawer = true;
      this.$refs.adduser.studentsData.type = "insert";
    },
    editUser(index, rowdata) {
      this.rowIndex = index;
      this.$refs.adduser.drawer = true;
      this.$nextTick(() => {
        this.$refs.adduser.studentsData = {
          photo: rowdata[index].photo,
          name: rowdata[index].name,
          education: rowdata[index].education,
          id: rowdata[index].id,
          address: rowdata[index].address,
          tel: rowdata[index].tel,
          email: rowdata[index].email,
          experience: rowdata[index].experience,
          type: "update"
        };
      });
    },
    saveEditUser() {
      this.$set(this.tableData, this.rowIndex, {
        photo: this.$refs.adduser.studentsData.photo,
        name: this.$refs.adduser.studentsData.name,
        education: this.$refs.adduser.studentsData.education,
        id: this.$refs.adduser.studentsData.id,
        address: this.$refs.adduser.studentsData.address,
        tel: this.$refs.adduser.studentsData.tel,
        email: this.$refs.adduser.studentsData.email,
        experience: this.$refs.adduser.studentsData.experience
      });
      this.rowIndex = -1;
    },
    addRow() {
      this.loading = true;
      this.tableData = [];
      this.getTableData();
    },
    handleCurrentChange(val) {
      this.pageNum = val;
      this.loading = true;
      this.tableData = [];
      this.getTableData();
    },
    getTableData() {
      let _this = this;
      if (this.pageNum === undefined) {
        _this.pageNum = 1;
      }
      getData(
        "http://47.103.210.8:8080/get_members?page_size=" +
          _this.pageSize +
          "&page_num=" +
          _this.pageNum
      ).then(res => {
        let members = res.data.members;
        console.log(res);
        _this.totalSize = res.data.members_total_size;
        for (let i = 0; i < members.length; i++) {
          _this.tableData.push({
            photo: members[i].photo,
            name: members[i].name,
            education: members[i].education,
            id: members[i].id,
            address: members[i].address,
            tel: members[i].tel,
            email: members[i].email,
            experience: members[i].experience
          });
        }
        this.loading = false;
      });
    }
  }
};
</script>
<style lang="stylus" scoped>
.pagination
  margin-top: 20px
  margin-bottom: 40px
.form-drawer >>>.el-drawer__close-btn
  z-index: 200
</style>