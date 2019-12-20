import Vue from 'vue';
import Router from 'vue-router';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css'; // Progress 进度条样式
import Home from '@/views/home/home.vue'
Vue.use(Router);
/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
const routerReplace = Router.prototype.replace
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Router.prototype.replace = function replace(location) {
  return routerReplace.call(this, location).catch(error => error)
}
const router = new Router({
  routes: [
    {
      name: 'index',
      path: '/',
      meta: { title: '防汛预计', hidden: true },
      component: () => import('@/views/index/index.vue')
    },
    {
      path: '*',
      meta: { title: '404', hidden: true },
      component: () => import('@/views/errorPage/404')
    },
    {
      name: '401',
      path: '/401',
      meta: { title: '401', hidden: true },
      component: () => import('@/views/errorPage/401')
    }
  ]
});

// 路由拦截

router.beforeEach((to, from, next) => {
  NProgress.start();
  // 有权限删除
  NProgress.done();
  next();

  // 有权限取消注释
  // if (to.name === '401') { // 暂无登录页
  //   NProgress.done();
  //   next();
  // } else {
  //   if (JSON.parse(getUserInfo())) {
  //     if (!JSON.parse(getUserInfo()).token) {
  //       NProgress.done();
  //       next()
  //     } else {
  //       if (store.state.currUserMenus.length <= 0) {
  //         Promise.all([getUserMenus()]).then(data => {
  //           const res = data[0]
  //           store.state.currUserMenus = res.result.children ? res.result.children : [];
  //           NProgress.done();
  //           next();
  //         });
  //       } else {
  //         NProgress.done();
  //         next();
  //       }
  //     }
  //   } else {
  //     next({
  //       name: '401'
  //     });
  //   }
  // }
});
export default router;
