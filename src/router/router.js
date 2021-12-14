let loginCom;
try {
  loginCom = require('@/main/login/index.vue').default;
} catch (e) {
  loginCom = () => import('@/main/error/500');
}
export default [
    {
        path: '/',
        name: 'login',
        redirect: '/login'
    },
    {
      path: '/login',
      name: 'login',
      meta: {
        title: 'Login - 登录',
        hideInMenu: true
      },
      component: loginCom
    },
    {
      path: '/register',
      name: 'register',
      meta: {
        title: '用户注册',
        hideInMenu: true
      },
      component: () => import('@/main/register/index')
    },
    {
      path: '/403',
      name: '403',
      meta: {
        title: '暂无权限',
        hideInMenu: true
      },
      component: () => import('@/main/error/403')
    },
    {
      path: '/404',
      name: '404',
      meta: {
        title: '暂无页面',
        hideInMenu: true
      },
      component: () => import('@/main/error/404')
    },
    {
      path: '/500',
      name: '500',
      meta: {
        title: '服务端异常',
        hideInMenu: true
      },
      component: () => import('@/main/error/500')
    },
  ]
