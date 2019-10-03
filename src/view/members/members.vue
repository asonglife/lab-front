<template>
  <div class="members-container">
    <h2 class="lab-item">教师团队</h2>
    <div class="demo-fit">
      <div class="block" v-for="(item,index) in membersData" :key="index">
        <el-image style="width: 100px; height: 100px;border-radius:5%" :src="item.photo"></el-image>
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
      membersData: [
        {
          photo: "",
          name: "",
          education: ""
        }
      ]
    };
  },
  mounted() {
    this.getMembersData();
  },
  methods: {
    getMembersData() {
      getData("lab.json").then(res => {
        this.membersData = res.data.membersData;
        console.log(this.membersData);
      });
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
</style>
