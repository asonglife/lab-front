<template>
  <div>
    <div v-for="item in news" :key="item.id">
      <div v-if="item.id==newsId" class="news-container">
        <h3>{{item.newTitle}}</h3>
        <i class="news-author">{{item.newAuthor+' '+item.newDate}}</i>
        <article>{{item.newContent}}</article>
        <el-image class="detail-img" :src="item.newImage" v-if="item.newImage.length>0"></el-image>
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
      getData(
        "http://47.103.210.8:8080/json_news?id=" + this.$route.params.id
      ).then(res => {
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
.news-author
  display: block
  text-align: right
  margin: 10px
</style>