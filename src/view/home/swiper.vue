<template>
  <div class="lab-swiper">
    <el-carousel :interval="5000" type="card" arrow="hover">
      <el-carousel-item v-for="item in SwiperImg" :key="item">
        <img :src="item" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
export default {
  data() {
    return {
      SwiperImg: []
    };
  },
  props: {
    labImg: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    labImg(val) {
      this.SwiperImg = val;
    }
  }
};
</script>
<style lang="stylus" scoped>
.el-carousel__item:nth-child(2n)
  background-color: #ffffff
.el-carousel__item:nth-child(2n + 1)
  background-color: #ffffff
.el-carousel__item img
  width: 100%
.lab-swiper
  text-align: center
</style>
