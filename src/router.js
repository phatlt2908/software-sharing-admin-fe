import screenConst from './constants/screenConst'

import MainLayout from '@/views/layouts/MainLayout'

import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    redirect: screenConst.DASHBOARD.path,
    content: 'Chia sẻ phần mềm, ứng dụng, games, thủ thuật,... Giúp làm chủ được thiết bị của bạn!',
  },
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: screenConst.DASHBOARD.path,
        component: () => import('@/views/screens/Dashboard'),
        name: 'dashboard',
        meta: {
          title: '',
          content: '',
          active: 'dashboard'
        }
      },
      {
        path: screenConst.POST_LIST.path,
        component: () => import('@/views/screens/PostList'),
        name: 'postList',
        meta: {
          title: 'Danh sách bài viết',
          content: 'Danh sách bài viết',
          active: 'postList'
        }
      },
      {
        path: screenConst.POST_DETAIL.path,
        component: () => import('@/views/screens/PostDetail'),
        name: 'postDetail',
        meta: {
          title: 'Bài viết',
          content: 'Bài viết',
          active: 'detail'
        }
      },
      {
        path: screenConst.COMMENT.path,
        component: () => import('@/views/screens/Comment'),
        name: 'comment',
        meta: {
          title: 'Bình luận',
          content: 'Bình luận',
          active: 'comment'
        }
      },
    ]
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: screenConst.DASHBOARD.path
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  document.title = to.meta.title ? to.meta.title + ' | Đây nè' : 'Đây nè | Admin'
  next()
})

export default router
