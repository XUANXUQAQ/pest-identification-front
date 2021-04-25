import Vue from 'vue';
import VueRouter from 'vue-router';
import networkUtils from '@/utils/networkUtils';

Vue.use(VueRouter);

function isEmpty(obj) {
  return typeof obj === 'undefined' || obj === null || obj === '';
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'DashBoard',
        component: () => import('../components/home/DashBoard.vue'),
      },
      {
        path: 'Family',
        component: () => import('../components/home/Family.vue'),
      },
      {
        path: 'Genus',
        component: () => import('../components/home/Genus.vue'),
      },
      {
        path: 'Order',
        component: () => import('../components/home/Order.vue'),
      },
      {
        path: 'Species',
        component: () => import('../components/home/Species.vue'),
      },
    ],
  },
  {
    path: '/Login',
    component: () => import('../components/login/Login.vue'),
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path === from.path) {
    next();
  }
  // 判断是否登录
  const token = networkUtils.token.getToken();
  const username = networkUtils.username.getUsername();
  if (!isEmpty(token) && !isEmpty(username)) {
    if (to.path === '/login' || to.path === '/') {
      next({ path: '/Dashboard' });
    }
    next();
  } else if (to.path === '/login') {
    next();
  } else {
    next({ path: '/login' });
  }
});

export default router;
