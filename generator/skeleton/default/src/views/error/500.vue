<template>
  <error type="500" message="抱歉，服务器内部错误"></error>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import Error from '@/views/error/comps/Error.vue'

  @Component({
    name: 'Error500View',
    components: {Error}
  })
  export default class Error500View extends Vue {}
</script>

<style lang="scss" scoped>
</style>
