export default [
  {
    path: '/list',
    name: 'list',
    redirect: 'list-table-list',
    meta: {
      title: '查询表格',
    },
  },
  {
    path: '/list/table-list',
    name: 'list-table-list',
    component: () => import('./index.vue'),
    meta: {
      title: '查询表格',
    },
  },
];
