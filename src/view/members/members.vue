<template>
  <div class="members-container">
    <h3 class="lab-item">教师团队</h3>
    <div class="demo-fit">
      <el-row>
        <el-col v-for="(item,index) in teachersData" :key="index" class="block">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.photo" class="member-img" />
            <div style="padding: 14px;" class="go-exper" @click="openDetails(item.id)">
              <span>{{item.name}}</span>
              <span class="time">{{item.education}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <h3 class="lab-item">学生团队</h3>
    <div class="demo-fit">
      <el-row>
        <el-col v-for="(item,index) in studentsData" :key="index" class="block">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="item.photo" class="member-img" />
            <div style="padding: 14px;" class="go-exper" @click="openDetails(item.id)">
              <span>{{item.name}}</span>
              <span class="time">{{item.education}}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
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
  margin: 4%
  width: 16%
.lab-item
  text-align: left
  color: #333
.member-img
  width: 100%
  display: block
.members-container
  text-align: center
.go-exper:hover
  color: #a6e1f1
  cursor: pointer
.time
  display: block
  font-size: 13px
  color: #999
  margin: 2px
</style>
