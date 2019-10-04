<template>
  <div>
    <div class="news-container" v-for="item in news" :key="item.id">
      <div v-if="item.id==newsId">
        <h3>{{item.newTitle}}</h3>
        <article>{{item.newContent}}</article>
        <el-image class="detail-img" :src="item.newImage"></el-image>
      </div>
    </div>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
export default {
  data() {
    return {
      news: [],
      newsId: ""
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      getData("news.json?id=" + this.$route.params.id).then(res => {
        this.news = res.data.news;
        this.newsId = this.$route.params.id;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.news-container
  text-align: center
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
  padding: 1em
  text-indent: 1em
.detail-img
  width: 500px
  height: 300px
  margin-top: 36px
</style>