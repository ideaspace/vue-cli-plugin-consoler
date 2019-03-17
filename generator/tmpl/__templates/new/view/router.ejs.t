---
to: src/views/<%%= h.inflection.dasherize(name.slice(0, name.indexOf('/'))) %%>/view.router.ts
inject: true
after: export default \[
---
<%%
  const compName = h.inflection.dasherize(name.slice(name.indexOf('/') + 1))
%%>  {
    path: '<%%= h.inflection.dasherize(name) %%>',
    name: '<%%= h.changeCase.paramCase(name) %%>',
    component: () => import('./<%%= h.inflection.dasherize(compName) %%>.vue'),
    meta: {
      title: '<%%= h.inflection.dasherize(name) %%>',
    },
  },
