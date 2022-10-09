<template>
  <div id="side">
    <aside class="menu">
      <p class="menu-label">General</p>
      <ul class="menu-list">
        <li>
          <router-link
            :to="{ name: 'dashboard' }"
            class="router-link-active icon-text"
            active-class="is-active"
          >
            <span class="icon">
              <font-awesome-icon icon="desktop" size="sm" />
            </span>
            <span class="menu-item-label">Dashboard</span>
          </router-link>
        </li>
      </ul>
      <p class="menu-label">Administration</p>
      <ul class="menu-list">
        <li>
          <router-link :to="{ name: 'postList' }"> Bài viết </router-link>
          <ul>
            <li>
              <router-link
                :to="{ name: 'postList' }"
                class="router-link-active icon-text"
                active-class="is-active"
              >
                <span class="icon">
                  <font-awesome-icon icon="list" size="sm" />
                </span>
                <span class="menu-item-label">Danh sách</span>
              </router-link>
            </li>
            <li>
              <router-link
                :to="{ name: 'postDetail' }"
                class="router-link-active icon-text"
                active-class="is-active"
              >
                <span class="icon">
                  <font-awesome-icon icon="plus" size="sm" />
                </span>
                <span class="menu-item-label">Thêm mới / sửa</span>
              </router-link>
            </li>
          </ul>
        </li>
        <li>
          <router-link
            :to="{ name: 'comment' }"
            class="router-link-active icon-text"
            active-class="is-active"
          >
            <span class="icon">
              <font-awesome-icon icon="comment" size="sm" />
            </span>
            <span class="menu-item-label">Bình luận</span>
          </router-link>
        </li>
      </ul>
    </aside>
  </div>
</template>

<script>
export default {
  name: "Side",
  data() {},
};
</script>

<style lang="scss" src="@/assets/scss/_side.scss"></style>
