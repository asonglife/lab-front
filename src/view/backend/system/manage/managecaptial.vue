
  <template>
  <div id="wraper" ref="myScrollbar">
    <router-bread></router-bread>
    <el-container>
      <el-main style="border-right:solid 1px #a6e1f1">
        <el-table :data="tableData" stripe border v-loading="loading">
          <el-table-column prop="id" label="编号" width="70"></el-table-column>
          <el-table-column prop="item" label="登记项目" width="100"></el-table-column>
          <el-table-column prop="money" label="登记金额（元）" width="120"></el-table-column>
          <el-table-column prop="date" label="登记时间" width="180"></el-table-column>
          <el-table-column prop="marker" label="登记人" width="120"></el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <auth-button size="mini" @click="editUser(scope.$index,tableData)" label="编辑"></auth-button>
              <auth-button
                size="mini"
                type="danger"
                @click="deleteUser(scope.$index,tableData)"
                label="删除"
              ></auth-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-aside width="290px" style="padding:18px;">
        <h6>资产登记信息填写</h6>
        <el-form style="margin:24px;" ref="captialform" :model="captial" :rules="rules">
          <el-form-item prop="id">
            <el-input v-model.number="captial.id" v-if="false"></el-input>
          </el-form-item>
          <el-form-item prop="item">
            <el-select placeholder="登记项目" v-model="captial.item">
              <el-option label="电脑" value="电脑"></el-option>
              <el-option label="实验器材" value="实验器材"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="money">
            <el-input v-model.number="captial.money" placeholder="登记金额" suffix-icon="el-icon-coin"></el-input>
          </el-form-item>
          <el-form-item prop="marker">
            <el-input v-model="captial.marker" placeholder="登记人" suffix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item prop="date">
            <el-col :span="11">
              <el-date-picker
                v-model="captial.date"
                value-format="yyyy-MM-dd"
                type="date"
                placeholder="选择登记日期"
              ></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item prop="remark">
            <el-input type="textarea" v-model="captial.remark" placeholder="备注"></el-input>
          </el-form-item>
          <el-form-item label="type" prop="type" v-show="false">
            <el-input v-model="captial.type"></el-input>
          </el-form-item>
          <auth-button type="primary" @click="submit()" label="提交" :loading="loading"></auth-button>
          <auth-button @click="resetForm()" label="重置"></auth-button>
        </el-form>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import { postData } from "api/postData.js";
import AuthButton from "view/backend/system/managecomponents/authbutton.vue";
export default {
  data() {
    var checkMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写登记金额"));
      } else if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      } else {
        return callback(); //如果不返回回调那么validate()里的回调会一直不执行
      }
    };
    return {
      tableData: [],
      rowIndex: -1,
      loading: false,
      topVisible: false,
      captial: {
        id: 0,
        item: "",
        money: "",
        marker: "",
        date: "",
        remark: "",
        type: "insert"
      },
      rules: {
        money: [{ required: true, validator: checkMoney, trigger: "change" }],
        item: [
          { required: true, message: "请选择登记项目", trigger: "change" }
        ],
        date: [
          { required: true, message: "请填写登记日期", trigger: "change" }
        ],
        marker: [{ required: true, message: "请填写登记人", trigger: "change" }]
      }
    };
  },
  components: {
    RouterBread,
    AuthButton
  },
  mounted() {
    this.getTableData();
  },
  methods: {
    resetForm() {
      this.$confirm("确认重置？重置后会失去您填写的所有信息").then(() => {
        this.$refs.captialform.resetFields();
      });
    },
    editUser(index, rowdata) {
      this.rowIndex = index;
      this.captial = {
        id: rowdata[index].id,
        item: rowdata[index].item,
        money: rowdata[index].money,
        marker: rowdata[index].marker,
        date: rowdata[index].date,
        remark: rowdata[index].remark,
        type: "update"
      };
    },
    deleteUser(index, rowdata) {
      this.$confirm("此操作将永久删除该数据, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postData(
            "http://47.103.210.8:8080/assets_change",
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
    addRow() {
      this.tableData = [];
      this.getTableData();
    },
    saveEditUser() {
      this.$set(this.tableData, this.rowIndex, {
        id: this.captial.id,
        item: this.captial.item,
        remark: this.captial.remark,
        marker: this.captial.marker,
        date: this.captial.date,
        money: this.captial.money
      });
      this.rowIndex = -1;
      this.$refs.captialform.resetFields();
    },
    submit() {
      this.$refs.captialform.validate(valid => {
        if (valid) {
          this.$confirm("确认提交？").then(() => {
            postData("http://47.103.210.8:8080/assets_change", this.captial, {
              "Content-Type": "application/json"
            }).then(res => {
              if (this.rowIndex >= 0) {
                this.saveEditUser();
                this.$message({
                  message: "编辑成功",
                  type: "success"
                });
              } else {
                this.addRow();
                this.$message({
                  message: "提交成功",
                  type: "success"
                });
              }
            });
          });
        }
      });
    },
    getTableData() {
      let _this = this;
      this.loading = true;
      getData("http://47.103.210.8:8080/get_assets").then(res => {
        let assets = res.data.assets;
        for (let i = 0; i < assets.length; i++) {
          _this.tableData.push({
            id: assets[i].id,
            item: assets[i].item, //登记项目
            remark: assets[i].remark, //备注
            marker: assets[i].marker, //登记人
            date: assets[i].date, //登记日期
            money: assets[i].money //登记金额
          });
        }
        this.loading = false;
        this.$refs.captialform.resetFields();
      });
    }
  }
};
</script>





<style lang="stylus" scoped></style>