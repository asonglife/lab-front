
  <template>
  <div>
    <routerbread></routerbread>
    <el-container>
      <el-main style="border-right:solid 1px #a6e1f1">
        <el-table :data="tableData" stripe border>
          <el-table-column prop="item" label="登记项目" width="100"></el-table-column>
          <el-table-column prop="money" label="登记金额（元）" width="120"></el-table-column>
          <el-table-column prop="date" label="登记时间" width="180"></el-table-column>
          <el-table-column prop="marker" label="登记人" width="120"></el-table-column>
          <el-table-column prop="remark" label="备注" :show-overflow-tooltip="true"></el-table-column>
          <el-table-column label="操作" width="180">
            <template slot-scope="scope">
              <el-button size="mini" @click="editUser(scope.$index,tableData)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.$index,tableData)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-main>
      <el-aside width="290px" style="padding:18px;">
        <h6>资产登记信息填写</h6>
        <el-form style="margin:24px;" ref="captialform" :model="captial" :rules="rules">
          <el-form-item prop="item">
            <el-select placeholder="登记项目" v-model="captial.item">
              <el-option label="电脑" value="电脑"></el-option>
              <el-option label="实验器材" value="实验器材"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item prop="money">
            <el-input v-model="captial.money" placeholder="登记金额" suffix-icon="el-icon-coin"></el-input>
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
          <el-button type="primary" plain @click="submit()">提交</el-button>
          <el-button @click="resetForm()">重置</el-button>
        </el-form>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Routerbread from "view/backend/system/managecomponents/routerbread.vue";
import { postData } from "api/postData.js";
export default {
  data() {
    var checkMoney = (rule, value, callback) => {
      if (!value) {
        callback(new Error("请填写登记金额"));
      } else if (!Number.isInteger(+value)) {
        callback(new Error("请输入数字值"));
      }
    };
    return {
      tableData: [
        {
          date: "2016-05-02",
          marker: "王小虎",
          remark: "上海市普陀区金沙江路 1518 弄",
          item: "电脑",
          money: "3000"
        }
      ],
      rowIndex: -1,
      captial: {
        item: "",
        money: "",
        marker: "",
        date: "",
        remark: ""
      },
      rules: {
        money: [{ required: true, validator: checkMoney, trigger: "change" }],
        item: [
          { required: true, message: "请选择登记项目", trigger: "change" }
        ],
        date: [
          { required: true, message: "请填写登记日期", trigger: "change" }
        ],
        marker: [{ required: true, message: "请填写登记人", trigger: "blur" }]
      }
    };
  },
  components: {
    Routerbread
  },
  methods: {
    resetForm() {
      this.$confirm("确认重置？重置后会失去您填写的所有信息").then(() => {
        if (this.$refs.captialform !== undefined) {
          this.$refs.captialform.resetFields();
        }
      });
    },
    editUser(index, rowdata) {
      this.rowIndex = index;

      this.captial = {
        item: rowdata[index].item,
        money: rowdata[index].money,
        marker: rowdata[index].marker,
        date: rowdata[index].date,
        remark: rowdata[index].remark
      };
    },
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
    addRow() {
      this.tableData.push({
        item: this.captial.item,
        remark: this.captial.remark,
        marker: this.captial.marker,
        date: this.captial.date,
        money: this.captial.money
      });
    },
    saveEditUser() {
      this.$set(this.tableData, this.rowIndex, {
        item: this.captial.item,
        remark: this.captial.remark,
        marker: this.captial.marker,
        date: this.captial.date,
        money: this.captial.money
      });
      this.rowIndex = -1;
    },
    submit() {
      this.$refs.captialform.validate(valid => {
        if (valid) {
          this.$confirm("确认提交？").then(() => {
            if (this.rowIndex >= 0) {
              this.saveEditUser();
              this.resetForm();
            } else {
              this.addRow();
              this.resetForm();
            }
          });
        }
      });
    }
  }
};
</script>





<style lang="stylus" scoped></style>