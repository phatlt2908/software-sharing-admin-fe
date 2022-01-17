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
        path: screenConst.POST_DETAIL.path,
        component: () => import('@/views/screens/PostDetail'),
        name: 'postDetail',
        meta: {
          title: 'Chi tiết',
          content: 'Chi tiết',
          active: 'detail'
        }
      }
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
