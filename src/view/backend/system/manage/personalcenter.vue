<template>
  <div>
    <router-bread></router-bread>
    <el-container>
      <el-aside width="350px" class="aside-container">
        <img
          id="personImg"
          src="https://qpic.y.qq.com/music_cover/3MLTH2k3HibTypyQfrdDcnM7VEodMX7LgkUxticK5QjnXZzG5kdo49Hw/300?n=1"
        />
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