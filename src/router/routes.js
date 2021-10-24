
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Auth.vue') },
      { path: '/home', component: () => import('pages/Home.vue'), meta: { requiresAuth: true } },
      { path: '/list', component: () => import('pages/listpage.vue'), meta: { requiresAuth: true } },
      { path: '/Add', component: () => import('components/AddDataComponent.vue'), meta: { requiresAuth: true } },
      { path: '/profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true } },
      { path: '/transaction', component: () => import('pages/Transaction.vue'), meta: { requiresAuth: true } },
      { path: '/bill/:id', component: () => import('pages/Bill.vue'), meta: { requiresAuth: true } },
      { path: '/income', component: () => import('pages/Income.vue'), meta: { requiresAuth: true } }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
