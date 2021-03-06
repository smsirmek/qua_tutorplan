
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '/', component: () => import('pages/Auth.vue') },
      { path: '/home', component: () => import('pages/Home.vue'), meta: { requiresAuth: true } },
      { path: '/list', component: () => import('pages/Listpage.vue'), meta: { requiresAuth: true } },
      { path: '/add/studentlist', component: () => import('components/AddDataComponent.vue'), meta: { requiresAuth: true } },
      { path: '/add/work', component: () => import('src/pages/AddWork.vue'), meta: { requiresAuth: true } },
      { path: '/profile', component: () => import('pages/Profile.vue'), meta: { requiresAuth: true } },
      { path: '/transaction', component: () => import('pages/Transaction.vue'), meta: { requiresAuth: true } },
      { path: '/bill/:id', component: () => import('pages/Bill.vue'), meta: { requiresAuth: true } },
      { path: '/income', component: () => import('pages/Income.vue'), meta: { requiresAuth: true } },
      { path: '/edit/studentdata/:Key', component: () => import('components/EditDataComponent.vue'), meta: { requiresAuth: true } },
      { path: '/edit/work/:Key', component: () => import('pages/EditWork.vue'), meta: { requiresAuth: true } },
      { path: '/esig/:id', component: () => import('pages/eSig.vue'), meta: { requiresAuth: true } },
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
