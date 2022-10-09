<template>
  <body>
    <div>
      <div>
        <top></top>
      </div>
      <div class="side-bar">
        <side></side>
      </div>
      <div class="content">
        <section class="section">
          <router-view></router-view>
        </section>
      </div>
    </div>
  </body>
</template>

<script>
import Side from "../components/Side.vue";
import Top from "../components/Top.vue";
export default {
  name: "MainLayout",
  data() {},
  computed: {
    breadcrumbs: function () {
      return this.$route.meta.breadcrumb;
    },
  },
  components: { Side, Top },
};
</script>

<style lang="scss" scoped>
.side-bar {
  width: 15rem;
  z-index: 10;
  background: #2e323a;
  height: 100vh;
  overflow-y: auto;
  padding: 10px;
  position: -webkit-fixed;
  position: fixed;
  top: 0;
}

.content {
  margin-top: 56px;
  padding-left: 15rem;
  transition: padding-left 0.25s ease-in-out 50ms;
}
</style>
