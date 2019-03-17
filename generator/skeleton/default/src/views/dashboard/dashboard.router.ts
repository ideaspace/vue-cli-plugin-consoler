export default [
  {
    path: '/dashboard',
    name: 'dashboard',
    component: () => import('./index.vue'),
    meta: {
      title: '概览',
    },
  },
];
