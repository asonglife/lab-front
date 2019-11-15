<template>
  <div class="authbutton">
    <el-button
      :size="size"
      :type="type"
      :disabled="isSort"
      :icon="icon"
      @click="handleClick()"
      :circle="circle"
    >{{label}}</el-button>
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
      default: ""
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
    },
    icon: {
      type: String,
      default: null
    },
    circle: {
      type: Boolean,
      default: false
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
</style>