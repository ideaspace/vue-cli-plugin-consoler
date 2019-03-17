export default [
  {
    path: '/error/403',
    name: 'error-403',
    component: () => import('./403.vue'),
    meta: {
      title: '403',
    },
  },
  {
    path: '/error/404',
    name: 'error-404',
    component: () => import('./404.vue'),
    meta: {
      title: '404',
    },
  },
  {
    path: '/error/500',
    name: 'error-500',
    component: () => import('./500.vue'),
    meta: {
      title: '500',
    },
  },
];
