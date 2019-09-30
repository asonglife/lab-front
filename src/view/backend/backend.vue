<template>
  <div>
    <login></login>
  </div>
</template>

<script>
import Login from "view/backend/login/login.vue";
export default {
  components: {
    Login
  },
  data() {
    return {
      img: require("assets/img/title.jpg")
    };
  }
};
</script>

<style lang="stylus" scoped></style>