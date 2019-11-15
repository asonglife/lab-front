<template>
  <div>
    <router-bread></router-bread>
    <el-container>
      <el-aside width="350px" class="aside-container">
        <img
          id="personImg"
          src="https://qpic.y.qq.com/music_cover/3MLTH2k3HibTypyQfrdDcnM7VEodMX7LgkUxticK5QjnXZzG5kdo49Hw/300?n=1"
        />
        <p>姓名：xxx</p>
        <p>身份：老师</p>
        <p>学历：本科</p>
        <p>电话：15123660112</p>
        <p>邮箱：494053286@qq.com</p>
      </el-aside>
      <el-main class="main-container">mian</el-main>
    </el-container>
  </div>
</template>

<script>
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
export default {
  components: {
    RouterBread
  }
};
</script>

<style>
#personImg {
  width: 150px;
  height: 190px;
}
.aside-container {
  padding: 16px;
}
.main-container {
  background-color: aquamarine;
}
</style>