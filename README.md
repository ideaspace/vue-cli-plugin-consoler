# vue-cli-plugin-consoler

Front end boilerplate init plugin for @vue/cli 3.0.

### Install

First you need to install `@vue/cli` globally (follow the instructions [here](https://cli.vuejs.org/)).

Then create a project and add the Consoler plugin:

```bash
vue create my-app
cd my-app
vue add consoler
```

This will update and add the files in your project, then you can use `npm run serve` command to serve your app.

### Create file via CLI

``` bash
npm run new:viewr test      => @/views/test/index.vue,  @/views/test/test.router.ts
npm run new:view test/ab    => @/views/test/ab.vue & update test.router.ts
npm run new:comp test/ab    => @/views/test/comps/Ab.vue
npm run new:dialog test/ab  => @/views/test/dialogs/Ab.vue 
npm run new:module test     => @/views/test/test.module.ts 
npm run new:api test        => @/apis/test.ts
```
The Consoler plugin is integrated [hygen](http://hygen.io) to provide you with quicker creating file.
