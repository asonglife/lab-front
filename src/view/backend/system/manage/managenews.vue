<template>
  <div>
    <router-bread></router-bread>
    <div class="table-container">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="已上传" name="first">
          <el-table :data="upData" max-height="466" v-loading="loading" border>
            <el-table-column prop="id" label="编号" width="100" v-if="false"></el-table-column>
            <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" width="500"></el-table-column>
            <el-table-column prop="isHot" label="类型" width="300"></el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <auth-button
                  @click="editUser(scope.$index,tableData)"
                  label="编辑"
                  style="margin-right: 4px"
                ></auth-button>
                <auth-button type="danger" @click="deleteNews(scope.$index,tableData)" label="删除"></auth-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="草稿箱" name="second">
          <el-table :data="draftData" border v-loading="loading" max-height="466">
            <el-table-column prop="id" label="编号" width="100" v-if="false"></el-table-column>
            <el-table-column prop="title" label="标题" :show-overflow-tooltip="true" width="500"></el-table-column>
            <el-table-column prop="isHot" label="类型" width="300"></el-table-column>
            <el-table-column label="操作" min-width="180">
              <template slot-scope="scope">
                <auth-button
                  @click="editUser(scope.$index,tableData)"
                  label="编辑"
                  style="margin-right: 4px"
                ></auth-button>
                <auth-button type="danger" @click="deleteNews(scope.$index,tableData)" label="删除"></auth-button>
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
export default {
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
      loading: false
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
    handleSelectionChange() {},
    deleteNews() {},
    getNewsData(val) {
      getData(
        "http://47.103.210.8:8080/get_articles?isDraft=" + this.isDraft
      ).then(res => {
        console.log(res);
        let articles = res.data.articles;
        for (let i = 0; i < articles.length; i++) {
          val.push({
            id: articles[i].id,
            title: articles[i].title,
            isHot: this.typeSwitch(articles[i].isHot)
          });
        }
      });
    },
    typeSwitch(val) {
      switch (val) {
        case 0:
          return "新闻快讯";
          break;
        case 1:
          return "图片新闻";
          break;
        case 2:
          return "热点新闻";
          break;
      }
    }
  }
};
</script>

<style lang="stylus" scoped>
.table-container
  margin: 8px 42px 0 42px
</style>>