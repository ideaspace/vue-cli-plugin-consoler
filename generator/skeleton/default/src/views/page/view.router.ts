export default [
  {
    path: '/base-detail',
    name: 'base-detail',
    component: () => import('./index.vue'),
    meta: {
      title: 'base-detail',
    },
  },
  {
    path: '/inner-detail',
    name: 'inner-detail',
    component: () => import('./inner.vue'),
    meta: {
      title: 'inner-detail',
    },
  },
];
