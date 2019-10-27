<template>
  <div class="authbutton">
    <el-button :size="size" :type="type" :disabled="isSort" @click="handleClick()">{{label}}</el-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isSort: true
    };
  },
  props: {
    label: {
      type: String,
      default: "Button"
    },
    size: {
      // 按钮尺寸
      type: String,
      default: "mini"
    },
    type: {
      // 按钮类型
      type: String,
      default: null
    }
  },
  mounted() {
    this._isSort();
  },
  methods: {
    _isSort() {
      this.isSort = !this.$store.getters.getUserInfo.sort;
    },
    handleClick() {
      this.$emit("click", "");
    }
  }
};
</script>

<style lang="stylus" scoped>
.authbutton
  display: inline
  margin: 4px
</style>