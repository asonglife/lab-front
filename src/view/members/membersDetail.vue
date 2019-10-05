<template>
  <div>
    <div v-for="item in membersData" :key="item.id">
      <div v-if="item.id==routeId" class="detail-container">
        <el-image class="detail-img" :src="item.photo"></el-image>
        <h3>{{item.name+" "+item.education}}</h3>
        <article>个人经历：{{item.experience}}</article>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
export default {
  mounted() {
    this.getMembersData();
  },
  data() {
    return {
      membersData: [],
      routeId: ""
    };
  },
  methods: {
    getMembersData() {
      getData("lab.json?id=" + this.$route.params.id).then(res => {
        this.routeId = this.$route.params.id;
        let teachersData = res.data.membersData.teachersData;
        let studentsData = res.data.membersData.studentsData;
        for (let i = 0; i < teachersData.length; i++) {
          this.membersData.push(teachersData[i]);
        }
        for (let i = 0; i < studentsData.length; i++) {
          this.membersData.push(studentsData[i]);
        }
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.detail-img
  width: 200px
  height: 200px
  float: left
  margin-right: 15px
.detail-container
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
  padding: 1em
  text-indent: 1em
</style>