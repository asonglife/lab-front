<template>
  <div>
    <router-bread></router-bread>
    <div class="table-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已上传" name="first">
          <el-table :data="upData" v-loading="loading" stripe size="mini" border>
            <el-table-column prop="date" label="上传时间" width="250" header-align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              :show-overflow-tooltip="true"
              width="400"
              header-align="center"
            ></el-table-column>
            <el-table-column prop="isHot" label="类型" width="170"></el-table-column>
            <el-table-column prop="author" label="上传者" width="200"></el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <auth-button
                  @click="subEditNews(scope.$index,upData)"
                  icon="el-icon-edit"
                  circle
                  style="margin-right: 10px"
                ></auth-button>
                <auth-button
                  type="danger"
                  @click="deleteNews(scope.$index,upData)"
                  icon="el-icon-delete"
                  circle
                ></auth-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">
          <el-table :data="draftData" v-loading="loading" stripe size="mini" border>
            <el-table-column prop="date" label="上传时间" width="250" header-align="center">
              <template slot-scope="scope">
                <i class="el-icon-time"></i>
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column
              prop="title"
              label="标题"
              :show-overflow-tooltip="true"
              width="400"
              header-align="center"
            ></el-table-column>
            <el-table-column prop="isHot" label="类型" width="170"></el-table-column>
            <el-table-column prop="author" label="上传者" width="200"></el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <auth-button
                  @click="subEditNews(scope.$index,draftData)"
                  icon="el-icon-edit"
                  circle
                  style="margin-right: 10px"
                ></auth-button>
                <auth-button
                  type="danger"
                  @click="deleteNews(scope.$index,draftData)"
                  icon="el-icon-delete"
                  circle
                ></auth-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import RouterBread from "view/backend/system/managecomponents/routerbread.vue";
import AuthButton from "view/backend/system/managecomponents/authbutton.vue";
import { getData } from "api/getData.js";
import { postData } from "api/postData.js";
import { isNullObj } from "assets/js/isNullObj.js";
import url from "api/apiUrl.js";
export default {
  inject: ["reload"],
  components: {
    RouterBread,
    AuthButton
  },
  data() {
    return {
      activeName: "first",
      upData: [],
      draftData: [],
      isDraft: 0,
      loading: false,
      editflag: false
    };
  },
  mounted() {
    this.getNewsData(this.upData);
  },
  methods: {
    handleClick(tab) {
      if (tab.label === "已上传") {
        this.isDraft = 0;
        this.upData = [];
        this.getNewsData(this.upData);
      } else {
        this.isDraft = 1;
        this.draftData = [];
        this.getNewsData(this.draftData);
      }
    },
    isEdit() {
      let getArticles = this.$store.getters.getArticles.id;
      if (getArticles) {
        return false;
      } else {
        return true;
      }
    },
    subEditNews(index, rowdata) {
      this.$store.dispatch("_editFlag", true).then(() => {
        if (!this.isEdit()) {
          this.$confirm("仍有未完成编辑的工作, 是否开启新的编辑", "提示", {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            type: "warning"
          }).then(() => {
            this.editNews(index, rowdata);
          });
        } else {
          this.editNews(index, rowdata);
        }
      });
    },
    editNews(index, rowdata) {
      let articles = {};
      this.editloading = true;
      getData(rowdata[index].content).then(res => {
        articles = {
          id: rowdata[index].id,
          isHot: this.typeSwitch(rowdata[index].isHot),
          content: res.data,
          title: rowdata[index].title
        };
        this.editloading = false;
        this.$store.dispatch("_setArticles", articles);
        this.$router.push({ name: "Uploadnews" });
        this.reload();
      });
    },
    deleteNews(index, rowdata) {
      let flag = rowdata[index].isDraft;
      this.$confirm("此操作将永久删除该新闻, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          postData(
            url.changeNewsdata,
            {
              id: rowdata[index].id,
              type: "delete"
            },
            {
              "Content-Type": "application/json"
            }
          )
            .then(res => {
              if (res.data.status == "delete") {
                if (flag == 0) {
                  this.upData = [];
                  this.getNewsData(this.upData);
                } else {
                  this.draftData = [];
                  this.getNewsData(this.draftData);
                }
                this.$message({
                  type: "success",
                  message: "删除成功!"
                });
              } else {
                this.$message({
                  type: "error",
                  message: "删除失败!"
                });
              }
            })
            .catch(err => {
              this.$message({
                type: "error",
                message: err
              });
            });
        })
        .catch(err => {
          this.$message({
            type: "error",
            message: err
          });
        });
    },
    getNewsData(val) {
      this.loading = true;
      getData(url.getNewsdata + "?isDraft=" + this.isDraft).then(res => {
        let articles = res.data.articles;
        for (let i = 0; i < articles.length; i++) {
          val.push({
            id: articles[i].id,
            title: articles[i].title,
            isHot: this.typeSwitch(articles[i].isHot),
            isDraft: articles[i].isDraft,
            content: articles[i].content,
            date: articles[i].date,
            author: articles[i].author
          });
        }
        this.loading = false;
      });
    },
    typeSwitch(val) {
      switch (val) {
        case 1:
          return "普通新闻";
          break;
        case 2:
          return "热点新闻";
          break;
        case 3:
          return "轮播新闻";
        case 0:
          return "科研情况";
        case "普通新闻":
          return "1";
          break;
        case "热点新闻":
          return "2";
          break;
        case "轮播新闻":
          return "3";
          break;
        case "科研情况":
          return "0";
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-container
  margin: 8px 42px 56px 42px
</style>>