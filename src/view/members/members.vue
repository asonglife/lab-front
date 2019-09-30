<template>
  <div class="members-container">
    <div class="demo-fit">
      <div class="block" v-for="fit in fits" :key="fit">
        <el-avatar shape="square" :size="100" :fit="fit" :src="url"></el-avatar>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      fits: [
        "fill",
        "contain",
        "cover",
        "none",
        "scale-down1",
        "fill2",
        "contain3",
        "cover4",
        "none3",
        "scale-down4"
      ],
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  }
};
</script>
<style lang="stylus" scoped>
.members-container >>> .demo-fit
  display: flex
  flex-direction: row
  flex-wrap: wrap
</style>
