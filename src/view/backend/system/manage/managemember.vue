<template>
  <div class="managemember">
    <router-bread></router-bread>
    <el-main>
      <i class="el-icon-s-data back-member" @click="this.backMember" v-if="backmember">返回</i>
      <div class="toolbar" style="float:right;">
        <el-form :inline="true" size="small" ref="findForm" :model="foundData">
          <el-form-item prop="id">
            <el-input
              prefix-icon="el-icon-search"
              placeholder="学号/工号"
              v-model.number="foundData.id"
            ></el-input>
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
        <el-table-column prop="isTeacher" label="身份" width="100"></el-table-column>
        <el-table-column prop="education" label="学历" width="100"></el-table-column>
        <el-table-column prop="email" label="邮箱" width="180"></el-table-column>
        <el-table-column prop="tel" label="电话" width="180"></el-table-column>
        <el-table-column prop="address" label="地址" :show-overflow-tooltip="true" width="200"></el-table-column>
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
import url from "api/apiUrl.js";
export default {
  data() {
    return {
      tableData: [],
      rowIndex: -1,
      pageSize: 6,
      totalSize: 0,
      pageNum: 1,
      loading: true,
      foundData: {
        id: ""
      },
      mulDeleteVisi: false,
      mulSelection: [],
      muldeleId: [],
      backmember: false
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
            url.changeMembersdata,
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
          url.changeMembersdata,
          {
            id: _this.muldeleId,
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
      });
    },
    findUser() {
      if (this.foundData.id !== "") {
        this.loading = true;
        getData(url.getMembersdata + "?id=" + this.foundData.id).then(res => {
          this.loading = false;
          this.backmember = true;
          if (res.status === 200) {
            let members = res.data.members;
            if (members.length > 0) {
              this.tableData = [];
              this.tableData.push({
                photo: members[0].photo,
                name: members[0].name,
                education: members[0].education,
                id: members[0].id,
                isTeacher: this.typeSwitch(members[0].isTeacher),
                address: members[0].address,
                tel: members[0].tel,
                email: members[0].email,
                experience: members[0].experience
              });
              this.$nextTick(() => {
                this.$refs.findForm.resetFields();
              });
            } else {
              this.tableData = [];
            }
          }
        });
      } else {
        this.$message({
          message: "请输入您要查询的id",
          type: "error"
        });
      }
    },
    addUser() {
      this.$refs.adduser.drawer = true;
      this.$refs.adduser.studentsData.type = "insert";
    },
    backMember() {
      this.addRow();
      this.backmember = false;
    },
    editUser(index, rowdata) {
      this.rowIndex = index;
      console.log(index);
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
          isTeacher: this.typeSwitch(rowdata[index].isTeacher),
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
        isTeacher: this.typeSwitch(this.$refs.adduser.studentsData.isTeacher),
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
        url.getMembersdata +
          "?page_size=" +
          _this.pageSize +
          "&page_num=" +
          _this.pageNum
      ).then(res => {
        let members = res.data.members;

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
            isTeacher: this.typeSwitch(members[i].isTeacher),
            experience: members[i].experience
          });
        }
        this.loading = false;
      });
    },
    typeSwitch(val) {
      switch (val) {
        case 1:
          return "老师";
          break;
        case 0:
          return "学生";
          break;
        case "老师":
          return "1";
          break;
        case "学生":
          return "0";
          break;
      }
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
.back-member
  float: left
  font-size: 14px
  padding: 12px 12px 12px 24px
  color: #a6e1f1
.back-member:hover
  color: #409EFF
</style>