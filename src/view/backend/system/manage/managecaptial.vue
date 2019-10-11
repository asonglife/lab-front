<template>
  <div>
    <p style="color:#a6e1f1;text-align:left">资产管理</p>
    <el-slider disabled :show-tooltip="false"></el-slider>
    <div class="toolbar" style="float:left; padding:18px;">
      <el-form :inline="true" size="small">
        <el-form-item>
          <el-input placeholder="姓名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="success">新增</el-button>
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
        <template>
          <el-button size="mini">编辑</el-button>
          <el-button size="mini" type="danger">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <div style="float:left;">
        <el-button size="mini" type="danger">批量删除</el-button>
      </div>
      <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"></el-pagination>
    </div>
  </div>
</template>

<script>
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
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大三",
          email: "49253286@qq.com",
          tel: "1362881596",

          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大二",
          email: "1320599286@qq.com",
          tel: "13615645956",

          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大二",
          email: "1320599286@qq.com",
          tel: "13615645956",

          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大二",
          email: "1320599286@qq.com",
          tel: "13615645956",

          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大二",
          email: "1320599286@qq.com",
          tel: "13615645956",

          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          user: "admin",
          name: "王小虎",
          grade: "大二",
          email: "1320599286@qq.com",
          tel: "13615645956",

          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  },
  methods: {
    formatter(row, column) {
      return row.address;
    }
  }
};
</script>




<style lang="stylus" scoped>
.pagination
  margin-top: 20px
</style>