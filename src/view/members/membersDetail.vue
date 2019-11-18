<template>
  <div v-loading="loading">
    <div class="detail-container">
      <el-image class="detail-img" :src="membersData.photo"></el-image>
      <h3>{{membersData.name+" "+membersData.education}}</h3>
      <article>个人经历：{{membersData.experience}}</article>
    </div>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
import url from "api/apiUrl.js";
export default {
  mounted() {
    this.getMembersData();
  },
  data() {
    return {
      membersData: [],
      loading: false
    };
  },
  methods: {
    getMembersData() {
      this.loading = true;
      getData(url.getMembersdata + "?id=" + this.$route.params.id).then(res => {
        this.loading = false;
        this.membersData = res.data.members[0];
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
  margin-top: 24px
</style>