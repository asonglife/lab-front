<template>
  <div class="members-container">
    <h3 class="lab-item">教师团队</h3>
    <div class="demo-fit">
      <div
        class="block"
        v-for="(item,index) in teachersData"
        :key="index"
        @click="openDetails(item.id)"
      >
        <el-image style="width: 100px; height: 100px;border-radius:5%" :src="item.photo" lazy></el-image>
        <p>{{item.name+" "+item.education}}</p>
      </div>
    </div>
    <h3 class="lab-item">学生团队</h3>
    <div class="demo-fit">
      <div
        class="block"
        v-for="(item,index) in studentsData"
        :key="index"
        @click="openDetails(item.id)"
      >
        <el-image style="width: 100px; height: 100px;border-radius:5%" :src="item.photo" lazy></el-image>
        <p>{{item.name+" "+item.education}}</p>
      </div>
    </div>
  </div>
</template>
<script>
import { getData } from "api/getData.js";
export default {
  data() {
    return {
      teachersData: [],
      studentsData: []
    };
  },
  mounted() {
    this.getMembersData();
  },
  methods: {
    getMembersData() {
      getData("lab.json").then(res => {
        this.teachersData = res.data.membersData.teachersData;
        this.studentsData = res.data.membersData.studentsData;
      });
    },
    openDetails(id) {
      //查看详情
      this.$router.push({ path: "membersDetail/" + id });
    }
  }
};
</script>
<style lang="stylus" scoped>
.members-container >>> .demo-fit
  display: flex
  flex-direction: row
  flex-wrap: wrap
  text-align: center
.members-container >>> .block
  margin: 3%
.lab-item
  text-align: left
  color: #333
.block:hover
  color: #5184ca
  cursor: pointer
</style>
