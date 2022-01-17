<template>
  <div id="top">
    <nav class="bd-navbar navbar">
      <div class="navbar-brand">
        <router-link :to="{ name: 'home' }" class="navbar-item">
          Đây Nè
        </router-link>
        <!-- <a>
          <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
        </a>
        <button
          id="searchIcon"
          class="navbar-item bd-navbar-search-icon bd-navbar-mobile-icon"
        >
          <span class="icon has-text-primary">
            <font-awesome-icon icon="search" size="lg" />
          </span>
        </button> -->
        <div
          class="navbar-burger"
          :class="{ 'is-active': isActiveMobile }"
          data-target="navbarExampleTransparentExample"
          @click="onBurger"
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div
        class="navbar-menu"
        id="navbarExampleTransparentExample"
        :class="{ 'is-active': isActiveMobile }"
      >
        <div class="navbar-start">
          <router-link :to="{ name: 'home' }" class="navbar-item">
            <span class="icon has-text-primary">
              <font-awesome-icon icon="home" />
            </span>
            <span>Trang chủ</span>
          </router-link>
          <router-link :to="{ name: 'game' }" class="navbar-item">
            <span class="icon has-text-danger">
              <font-awesome-icon icon="gamepad" />
            </span>
            <span>Games</span>
          </router-link>
          <router-link :to="{ name: 'office' }" class="navbar-item">
            <span class="icon has-text-info">
              <font-awesome-icon icon="print" />
            </span>
            <span>Văn phòng</span>
          </router-link>
          <router-link :to="{ name: 'graphic' }" class="navbar-item">
            <span class="icon has-text-success">
              <font-awesome-icon icon="paint-brush" />
            </span>
            <span>Đồ họa</span>
          </router-link>
          <router-link :to="{ name: 'technique' }" class="navbar-item">
            <span class="icon has-text-warning">
              <font-awesome-icon icon="drafting-compass" />
            </span>
            <span>Kỹ thuật</span>
          </router-link>
          <router-link :to="{ name: 'os' }" class="navbar-item">
            <span class="icon has-text-link">
              <font-awesome-icon :icon="['fab', 'windows']" />
            </span>
            <span>Hệ điều hành</span>
          </router-link>
          <router-link :to="{ name: 'common' }" class="navbar-item">
            <span class="icon has-text-black">
              <font-awesome-icon icon="file-archive" />
            </span>
            <span>Ai cũng cần</span>
          </router-link>
          <div class="navbar-item has-dropdown is-hoverable">
            <router-link
              :to="{ name: 'home' }"
              class="navbar-link is-arrowless"
            >
              <span class="has-text-link">
                <font-awesome-icon icon="ellipsis-h" />
              </span>
            </router-link>
            <div class="navbar-dropdown is-boxed">
              <router-link :to="{ name: 'home' }" class="navbar-item">
                Diệt virus
              </router-link>
              <hr class="navbar-divider" />
              <router-link :to="{ name: 'home' }" class="navbar-item">
                APK
              </router-link>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div class="navbar-item">
            <a>
              <font-awesome-icon :icon="['fab', 'facebook']" size="lg" />
            </a>
          </div>
        </div>
      </div>

      <div
        id="search"
        class="bd-search"
        :class="{ 'is-active': isActiveMobile }"
      >
        <p class="control has-icons-left">
          <span
            style="position: relative; display: inline-block; direction: ltr"
          >
            <input
              id="algoliaSearch"
              class="input is-rounded is-primary"
              type="text"
              placeholder="Tìm kiếm..."
              autocomplete="off"
              spellcheck="false"
              style="position: relative; vertical-align: top"
            />
          </span>
          <span class="icon is-small is-left has-text-primary">
            <font-awesome-icon icon="search" />
          </span>
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
import axios from "@/axios";

export default {
  name: "top",
  data() {
    return {
      isActiveMobile: false,
    };
  },
  methods: {
    onBurger() {
      this.isActiveMobile = !this.isActiveMobile;
    },
    logout() {
      this.$store.dispatch("logout");
      delete axios.defaults.headers.common["authorization"];
      localStorage.removeItem("accessToken");

      this.$swal({
        icon: "success",
        title: "Đã đăng xuất",
        toast: true,
        timer: 3000,
        position: "bottom-start",
        showConfirmButton: false,
        type: "success",
      });

      this.$router.push({ name: "home" });
    },
  },
};
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
</style>

<style lang="scss" src="@/assets/scss/top.scss"></style>
