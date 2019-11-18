<template>
  <div ref="news" class="news-container" v-loading="loading">
    <h3 v-html="news.title" class="news-title"></h3>
    <article v-html="content"></article>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
import url from "api/apiUrl.js";
export default {
  data() {
    return {
      news: {},
      content: "",
      loading: false
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.loading = true;
      getData(url.getNewsdata + "?id=" + this.$route.params.id).then(res => {
        this.news = res.data.articles[0];
        let articles = res.data.articles;
        let content = articles[0].content;

        getData(content).then(res => {
          this.content = res.data;
          this.loading = false;
        });
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.news-container
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
  padding: 1em
  text-indent: 1em
.news-title
  margin-bottom: 20px
  text-align: center
</style>