<template>
  <body>
    <h1>ADMIN</h1>
    <router-view></router-view>
  </body>
</template>

<script>
export default {
  name: "MainLayout",
  data() {},
  computed: {
    breadcrumbs: function () {
      return this.$route.meta.breadcrumb;
    },
  },
};
</script>

<style scoped>
</style>