<template>
  <div id="top">
    <nav class="bd-navbar navbar is-fixed-top">
      <div class="navbar-brand">
        <router-link :to="{ name: 'dashboard' }" class="navbar-item">
          <div class="">Đây Nè Admin</div>
        </router-link>
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

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ $store.state.user.name }}
            </a>
            <div class="navbar-dropdown">
              <router-link :to="{ name: 'userInfo' }" class="navbar-item">
                Thông tin tài khoản
              </router-link>
              <router-link :to="{ name: 'changePassword' }" class="navbar-item">
                Đổi mật khẩu
              </router-link>
              <hr class="navbar-divider" />
              <router-link :to="{ name: 'register' }" class="navbar-item">
                Tạo account
              </router-link>
            </div>
          </div>
          <a class="navbar-item" @click="logout">
            <span class="icon">
              <font-awesome-icon icon="sign-in-alt" size="sm" />
            </span>
            <span>Logout</span>
          </a>
        </div>
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
        position: "bottom-end",
        showConfirmButton: false,
        type: "success",
      });

      this.$router.push({ name: "login" });
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

<style lang="scss" src="@/assets/scss/_top.scss"></style>
