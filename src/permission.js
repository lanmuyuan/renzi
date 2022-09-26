import router from '@/router'
import store from '@/store'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
const whiteList = ['/login', '/404']
router.beforeEach((to, from, next) => {
  nprogress.start()
  if (store.getters.token) {
    if (!store.getters.userId) {
      store.dispatch('user/asyncGetUserInfo')
    }
    if (to.path === '/login') {
      next('/')
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) > -1) {
      next()
    } else {
      next('/login')
    }
  }
  nprogress.done()
})
router.afterEach(() => {
  nprogress.done()
})
