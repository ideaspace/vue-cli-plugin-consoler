---
to: src/views/<%%= h.inflection.dasherize(name.replace(/-/g, '_')) %%>/index.vue
---
<template>
  <view-container title="页面标题">
  </view-container>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: '<%%= h.changeCase.pascal(name) %%>View',
  })
  export default class <%%= h.changeCase.pascal(name) %%>View extends Vue {}
</script>
<style lang="scss" scoped>
</style>
