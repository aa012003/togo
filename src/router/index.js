import { createRouter, createWebHashHistory } from 'vue-router';

const routes = [
  {
    path: '/',
    component: () => import('../views/FrontView.vue'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/FrontView/HomeView.vue'),
      },
      {
        path: 'about',
        name: 'About',
        component: () => import('../views/FrontView/AboutView.vue'),
      },
      {
        path: 'Cart',
        component: () => import('../views/FrontView/CartView.vue'),
      },
      {
        path: 'products',
        component: () => import('../views/FrontView/ProductsView.vue'),
      },
      {
        path: 'product/:productId',
        component: () => import('../views/FrontView/ProductView.vue'),
      },
      {
        path: 'login',
        component: () => import('../views/FrontView/LoginView.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('../views/DasnbroadView/DashboardView.vue'),
    children: [
      {
        path: 'order',
        component: () => import('../views/DasnbroadView/OrderView.vue'),
      },
      {
        path: 'product',
        component: () => import('../views/DasnbroadView/ProductView.vue'),
      },
      {
        path: '/admin:pathMatch(.*)*',
        component: () => import('../views/FrontView/HomeView.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes,
});

export default router;
