
  <template>
  <div>
    <routerbread></routerbread>
    <el-container>
      <el-main style="border-right:solid 1px #a6e1f1">
        <el-table :data="tableData" stripe>
          <el-table-column prop="date" label="登记项目" width="180"></el-table-column>
          <el-table-column prop="name" label="登记金额" width="180"></el-table-column>
          <el-table-column prop="name" label="登记时间" width="180"></el-table-column>
          <el-table-column prop="name" label="登记人" width="180"></el-table-column>
          <el-table-column prop="address" label="备注" :show-overflow-tooltip="true"></el-table-column>
        </el-table>
      </el-main>
      <el-aside width="290px" style="padding:18px;">
        <h6>资产登记填写</h6>
        <el-form style="margin:24px;">
          <el-form-item ref="captialform" :model="captial">
            <el-select placeholder="登记项目">
              <el-option label="电脑" value="shanghai"></el-option>
              <el-option label="实验器材" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="登记金额" suffix-icon="el-icon-coin"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="登记人" suffix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择登记日期"></el-date-picker>
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-input type="textarea" placeholder="备注"></el-input>
          </el-form-item>

          <el-button type="primary" plain>提交</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form>
      </el-aside>
    </el-container>
  </div>
</template>

<script>
import Routerbread from "view/backend/system/managecomponents/routerbread.vue";
export default {
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1517 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1519 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1516 弄"
        }
      ]
    };
  },
  components: {
    Routerbread
  }
};
</script>





<style lang="stylus" scoped></style>