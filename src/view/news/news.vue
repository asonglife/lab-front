<template>
  <div v-loading="loading" class="news-container">
    <el-container style="margin-top:18px">
      <el-aside width="200px" style="margin-left:19px">
        <div style="padding:8px">
          <el-badge value="hot" class="item">
            <h6 style="margin:0px 12px 1px">热点新闻</h6>
          </el-badge>
        </div>
        <el-tooltip
          class="item"
          effect="dark"
          v-for="(item,index) in hotnews"
          :key="index"
          :content="item.title"
          placement="left-end"
        >
          <li class="lab-news lab-news-hot" @click="openDetails(item.id)">{{item.title}}</li>
        </el-tooltip>
      </el-aside>
      <el-main class="common">
        <div style="text-align:center">
          <el-carousel height="200px" autoplay id="caseContent" type="card" arrow="never">
            <el-carousel-item
              v-for="(item,index) in swipernews"
              :key="index"
              v-html="item.srcImg"
              @click.native="openDetails(item.id)"
            ></el-carousel-item>
          </el-carousel>
        </div>
        <ul style="padding:0">
          <li
            class="lab-news"
            v-for="(item,index) in commonnews"
            :key="index"
            @click="openDetails(item.id)"
          >
            <i class="el-icon-s-opportunity" style="color:gold"></i>
            {{item.title}}
            <i class="news-date">{{item.date}}</i>
          </li>
        </ul>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getData } from "api/getData.js";
export default {
  data() {
    return {
      hotnews: [],
      commonnews: [],
      loading: false,
      swipernews: [{ srcImg: "", id: "" }]
    };
  },
  mounted() {
    this.getNews();
  },
  methods: {
    getNews() {
      this.loading = true;
      getData("http://47.103.210.8:8080/get_articles?isDraft=0").then(res => {
        let articles = res.data.articles;

        for (let i = 0; i < articles.length; i++) {
          if (articles[i].isHot == 1) {
            this.commonnews.push(articles[i]);
          } else if (articles[i].isHot == 2) {
            this.hotnews.push(articles[i]);
          } else {
            getData(articles[i].content).then(res => {
              this.swipernews.push({
                srcImg: this.filterImg(res.data),
                id: articles[i].id
              });
            });
          }
        }
        console.log(this.swipernews);
        this.loading = false;
      });
    },
    openDetails(id) {
      //查看详情
      this.$router.push({ path: "newsDetail/" + id });
    },
    filterImg(str) {
      let srcImg = "";
      let imgReg = /<img.*?(?:>|\/>)/gi;
      let srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i;
      let arr = str.match(imgReg); // arr 为包含所有img标签的数组
      // console.log(arr);
      // for (let i = 0; i < arr.length; i++) {
      //   let src = arr[i].match(srcReg);
      //   srcImg = src[0];
      // }
      // console.log("图片地址" + "：" + srcImg);
      return arr[0];
    }
  },
  updated() {
    // document.getElementById('caseContent') 包裹层
    // 目标图片：width：100%
    let obj = document.getElementById("caseContent");
    let imgs = obj.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
      imgs[i].style.width = "502px";
    }
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
.news-date
  float: right
.common
  margin: 0
  padding: auto 12px
.lab-news-hot
  overflow: hidden // 溢出内容隐藏
  white-space: nowrap // 强制文本在一行内显示
  text-overflow: ellipsis // 当对象内文本溢出时显示省略标记
img
  width: 300px
  height: 200px
</style>