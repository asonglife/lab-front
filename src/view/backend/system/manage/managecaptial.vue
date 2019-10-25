
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
      <el-aside width="250px" style="padding:18px">
        <el-form>
          <el-form-item>
            <el-input placeholder="登记项目"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="登记金额"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="登记人"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="备注"></el-input>
          </el-form-item>
          <el-button type="primary" plain>提交</el-button>
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