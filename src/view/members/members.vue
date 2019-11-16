<template>
  <div class="members-container" v-loading="loading">
    <el-tabs :tab-position="tabPosition">
      <el-tab-pane label="教师团队">
        <div class="demo-fit">
          <el-row>
            <el-col v-for="(item,index) in teachersData" :key="index" class="block">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="item.photo" class="member-img" lazy :onerror="defaultImg" />
                <div style="padding: 14px;" class="go-exper" @click="openDetails(item.id)">
                  <span>{{item.name}}</span>
                  <span class="time">{{item.education}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
      <el-tab-pane label="学生团队">
        <div class="demo-fit">
          <el-row>
            <el-col v-for="(item,index) in studentsData" :key="index" class="block">
              <el-card :body-style="{ padding: '0px' }" shadow="hover">
                <img :src="item.photo" class="member-img" :onerror="defaultImg" lazy />
                <div style="padding: 14px;" class="go-exper" @click="openDetails(item.id)">
                  <span>{{item.name}}</span>
                  <span class="time">{{item.education}}</span>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import { getData } from "api/getData.js";
export default {
  data() {
    return {
      teachersData: [],
      studentsData: [],
      tabPosition: "left",
      loading: false,
      defaultImg: 'this.src="' + require("assets/img/fail.gif") + '"'
    };
  },
  mounted() {
    this.getMembersData();
  },
  methods: {
    getMembersData() {
      this.loading = true;
      getData("http://47.103.210.8:8080/get_members")
        .then(res => {
          console.log(res);
          let members = res.data.members;
          for (let i = 0; i < members.length; i++) {
            if (members[i].isTeacher == 1) {
              this.teachersData.push(members[i]);
            } else {
              this.studentsData.push(members[i]);
            }
          }
          this.loading = false;
        })
        .catch(err => {
          console.log(err);
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
  overflow: hidden
.members-container >>> .block
  margin: 0 4.3% 40px 4.3%
  width: 152px
  float: left
.member-img
  width: 100%
  height: 150px
.members-container
  text-align: center
  margin-top: 42px
  margin-bottom: 50px
.go-exper:hover
  color: #a6e1f1
  cursor: pointer
.time
  display: block
  font-size: 13px
  color: #999
  margin: 2px
</style>
