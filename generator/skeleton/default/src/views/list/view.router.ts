export default [
  {
    path: 'list/table-tree',
    name: 'list-table-tree',
    component: () => import('./table-tree.vue'),
    meta: {
      title: 'list/table-tree',
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
