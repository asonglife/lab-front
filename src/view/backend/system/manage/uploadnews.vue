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
        clearable
        class="title-style"
      ></el-input>
      <div
        style="text-align:left;margin:6px 0; color: #ccc;font-size:14px"
      >在编辑时，若未提示自动保存，请勿刷新页面，以免内容未保存！</div>
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
import { formatDate } from "assets/js/formatDate.js";
import { isNullObj } from "assets/js/isNullObj.js";
export default {
  mounted() {
    this.createWangEditor();
    this.saveTip();
  },
  data() {
    return {
      article: {
        id: "0",
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
    createWangEditor() {
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
      let _this = this;
      this.editor.customConfig.onchangeTimeout = 3000;
      this.editor.customConfig.onchange = function(html) {
        // html 即变化之后的内容'
        if (_this.delHtmlTag(html) !== "") {
          _this.autoSave();
          _this.$message({
            type: "success",
            message:
              "自动保存成功，时间:" +
              formatDate(new Date(), "yyyy-MM-dd hh:mm:ss"),
            duration: 2000
          });
        }
      };

      this.editor.customConfig.showLinkImg = false;
      this.editor.customConfig.uploadImgShowBase64 = true; // 使用 base64 保存图片
      this.editor.create();
    },
    autoSave() {
      let _this = this;
      if (this.delHtmlTag(this.editor.txt.html()) !== "") {
        _this.$nextTick(() => {
          _this.article = {
            id: parseInt(_this.article.id),
            title: _this.article.title,
            content: _this.editor.txt.html(),
            isHot: _this.article.isHot
          };
          _this.$store.dispatch("_setArticles", _this.article);
        });
      } else {
        _this.$nextTick(() => {
          _this.article = {
            id: parseInt(_this.article.id),
            title: _this.article.title,
            content: _this.editor.txt.html("<p></p>"),
            isHot: _this.article.isHot
          };
        });
        _this.$store.dispatch("_setArticles", _this.article);
      }
    },
    saveTip() {
      if (!isNullObj(this.$store.getters.getArticles)) {
        this.getContentFromStore();
        window.onbeforeunload = function(e) {
          e = e || window.event;
          // 兼容IE8和Firefox 4之前的版本
          if (e) {
            e.returnValue = "关闭提示";
          }
          // Chrome, Safari, Firefox 4+, Opera 12+ , IE 9+
          return "关闭提示";
        };
      }
    },
    getContentFromStore() {
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
      });
    },
    uploadNew(val) {
      if (this.article.title === "") {
        this.$message({
          message: "新闻标题不能为空",
          type: "error"
        });
      } else if (this.delHtmlTag(this.editor.txt.html()) == "") {
        this.$message({
          message: "新闻内容不能为空",
          type: "error"
        });
      } else {
        this.article = {
          id: parseInt(this.article.id),
          title: this.article.title,
          content: this.editor.txt.html(),
          isHot: parseInt(this.article.isHot),
          type: this.article.type,
          isDraft: val,
          author: this.$store.getters.getUserInfo.name,
          date: formatDate(new Date(), "yyyy-MM-dd hh:mm:ss")
        };
        console.log(this.delHtmlTag(this.editor.txt.html()));
        this.uptoBack();
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
              type: "insert",
              isDraft: false
            };
            this.$store.dispatch("_removeArticles").then(() => {
              this.$store.dispatch("_editFlag", false);
            });
            console.log(this.article);
          });
        } else {
          this.$message({
            message: "上传失败",
            type: "error"
          });
          this.$store.dispatch("_setArticles", this.article);
        }
      });
    },
    delHtmlTag(str) {
      return str.replace(/<[^>]+>/g, ""); //去掉所有的html标记
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.path != "/uploadnews") {
      this.autoSave();

      next();
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
#editor
  text-align: left
  font-size: 16px
  height: auto
.title-style
  margin-bottom: 0
.button-container
  margin-left: 75%
  margin-top: 10px
</style>