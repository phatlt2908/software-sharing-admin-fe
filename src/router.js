import screenConst from "./constants/screenConst";
import $store from "./store";

import MainLayout from "@/views/layouts/MainLayout";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    redirect: screenConst.DASHBOARD.path,
    content:
      "Chia sẻ phần mềm, ứng dụng, games, thủ thuật,... Giúp làm chủ được thiết bị của bạn!",
  },
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: screenConst.DASHBOARD.path,
        component: () => import("@/views/screens/Dashboard"),
        name: "dashboard",
        meta: {
          title: "",
          content: "",
          active: "dashboard",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.POST_LIST.path,
        component: () => import("@/views/screens/PostList"),
        name: "postList",
        meta: {
          title: "Danh sách bài viết",
          content: "Danh sách bài viết",
          active: "postList",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.POST_DETAIL.path,
        component: () => import("@/views/screens/PostDetail"),
        name: "postDetail",
        meta: {
          title: "Bài viết",
          content: "Bài viết",
          active: "detail",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.COMMENT.path,
        component: () => import("@/views/screens/Comment"),
        name: "comment",
        meta: {
          title: "Bình luận",
          content: "Bình luận",
          active: "comment",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.USER_INFO.path,
        component: () => import("@/views/screens/UserInfo"),
        name: "userInfo",
        meta: {
          title: "Thông tin tài khoản",
          content: "Thông tin tài khoản",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.CHANGE_PASSWORD.path,
        component: () => import("@/views/screens/ChangePassword"),
        name: "changePassword",
        meta: {
          title: "Đổi mật khẩu",
          content: "Đổi mật khẩu",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
      {
        path: screenConst.REGISTER.path,
        component: () => import("@/views/screens/Register"),
        name: "register",
        meta: {
          title: "Tạo account",
          content: "Tạo account",
          requireLogged: true,
          requireNotLogged: false,
        },
      },
    ],
  },
  {
    path: screenConst.LOGIN.path,
    component: () => import("@/views/screens/Login"),
    name: "login",
    meta: {
      title: "Đăng nhập",
      content: "Đăng nhập",
      requireLogged: false,
      requireNotLogged: true,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: screenConst.DASHBOARD.path,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if ($store.state.user.isLogged && to.meta.requireNotLogged) {
    next({
      path: screenConst.DASHBOARD.path,
    });
    return;
  }

  if (!$store.state.user.isLogged && to.meta.requireLogged) {
    next({
      path: screenConst.LOGIN.path,
    });
    return;
  }

  document.title = to.meta.title
    ? to.meta.title + " | Đây nè"
    : "Đây nè | Admin";
  next();
});

export default router;
