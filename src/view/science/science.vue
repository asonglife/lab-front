<template>
  <div v-loading="loading" class="news-container">
    <ul style="padding:0;margin:0">
      <li
        class="lab-news"
        v-for="(item,index) in science"
        :key="index"
        @click="openDetails(item.id)"
      >
        <i class="el-icon-s-opportunity" style="color:gold"></i>
        {{item.title}}
        <i class="news-date">{{item.date}}</i>
      </li>
    </ul>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
export default {
  data() {
    return {
      science: [],
      loading: false
    };
  },
  methods: {
    getScience() {
      this.loading = true;
      getData("http://47.103.210.8:8080/get_articles?isDraft=0").then(res => {
        let articles = res.data.articles;
        for (let i = 0; i < articles.length; i++) {
          if (articles[i].isHot == 0) {
            this.science.push(articles[i]);
          }
          console.log(this.science);
          this.loading = false;
        }
      });
    },
    openDetails(id) {
      //查看详情
      this.$router.push({ path: "newsDetail/" + id });
    }
  },
  mounted() {
    this.getScience();
  }
};
</script>

<style lang="stylus" scoped>
.lab-news
  list-style: none
  font-size: 12px
  font-family: inherit
  word-spacing: 9px
  line-height: 2em
.lab-news:hover
  color: #5184ca
  text-decoration-line: underline
  cursor: pointer
.news-container
  margin: 20px
.news-date
  float: right
</style>