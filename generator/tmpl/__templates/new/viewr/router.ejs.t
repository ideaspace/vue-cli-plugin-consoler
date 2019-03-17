---
to: src/views/<%%= h.inflection.dasherize(name) %%>/view.router.ts
---
export default [
  {
    path: '/<%%= h.inflection.dasherize(name) %%>',
    name: '<%%= h.inflection.dasherize(name) %%>',
    component: () => import('./index.vue'),
    meta: {
      title: '<%%= h.inflection.dasherize(name) %%>',
    },
  },
];
