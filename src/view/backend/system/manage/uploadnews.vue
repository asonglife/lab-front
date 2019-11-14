<template>
  <div>
    <router-bread></router-bread>
    <div id="editor-container">
      <el-input
        v-model="article.title"
        placeholder="输入新闻标题"
        prefix-icon="el-icon-edit"
        maxlength="100"
        show-word-limit
        class="title-style"
      ></el-input>
      <div id="editor"></div>
      <div style="margin-top: 20px">
        <el-radio-group v-model="article.isHot" size="small">
          <el-tooltip class="item" effect="dark" content="不含图片的纯文字新闻" placement="left-end">
            <el-radio label="1" border>新闻快讯</el-radio>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="含图片的新闻" placement="top">
            <el-radio label="2" border>图片新闻</el-radio>
          </el-tooltip>
          <el-tooltip class="item" effect="dark" content="热点新闻" placement="right-end">
            <el-radio label="3" border>热点推荐</el-radio>
          </el-tooltip>
        </el-radio-group>
      </div>
      <div class="button-container">
        <el-button size="small" type="primary" plain @click="uploadNew(false)">上传新闻</el-button>
        <el-button type="success" size="small" plain @click="uploadNew(true)">保存草稿</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import wangeditor from "wangeditor";
import { postData } from "api/postData.js";
export default {
  mounted() {
    this.editor = new wangeditor("#editor");
    this.editor.customConfig.menus = [
      "bold", // 粗体
      "fontSize", // 字号
      "fontName", // 字体
      "underline", // 下划线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "list", // 列表
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "image", // 插入图片
      "table", // 表格
      "undo", // 撤销
      "redo" // 重复
    ];
    this.editor.customConfig.showLinkImg = false;
    this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
    this.editor.create();
    let val = this.$store.getters.getArticles;
    this.$nextTick(() => {
      this.article = {
        id: val.id,
        title: val.title,
        content: this.editor.txt.html(val.content),
        isHot: val.isHot,
        type: "update",
        isDraft: false
      };
      console.log(this.article);
    });
  },
  data() {
    return {
      article: {
        id: "",
        title: "",
        content: "",
        isHot: "1",
        type: "insert",
        isDraft: false,
        author: "",
        date: ""
      }
    };
  },
  methods: {
    uploadNew(val) {
      if (this.article.title === "") {
        this.$message({
          message: "新闻标题不能为空",
          type: "error"
        });
      } else {
        this.article.content = this.editor.txt.text();
        if (this.article.content === "") {
          this.$message({
            message: "新闻文字内容不能为空",
            type: "error"
          });
        } else {
          let upTime = new Date();
          this.article = {
            id: parseInt(this.article.id),
            title: this.article.title,
            content: this.editor.txt.html(),
            isHot: parseInt(this.article.isHot),
            type: this.article.type,
            isDraft: val,
            author: this.$store.getters.getUserInfo.name,
            date: upTime.Format("yyyy-MM-dd HH:mm:ss")
          };
          this.uptoBack();
        }
      }
    },
    uptoBack() {
      postData("http://47.103.210.8:8080/change_articles", this.article, {
        "Content-Type": "application/json"
      }).then(res => {
        console.log(res);
        if (res.data.status == "insert" || res.data.status == "update") {
          this.$message({
            message: "上传成功",
            type: "success"
          });
          this.$nextTick(() => {
            this.article = {
              title: "",
              content: this.editor.txt.html("<p></p>"),
              isHot: "1",
              type: "",
              isDraft: false
            };
          });
        } else {
          this.$message({
            message: res.data.status,
            type: "error"
          });
        }
      });
    }
  },

  components: {
    RouterBread
  }
};
</script>
<style lang="stylus" scoped>
#editor-container
  padding: 30px
.title-style
  margin-bottom: 20px
.button-container
  margin-left: 75%
  margin-top: 10px
</style>