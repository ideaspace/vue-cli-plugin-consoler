<template>
  <error type="404" message="抱歉，您访问的页面不存在"></error>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Error from '@/views/error/comps/Error.vue';

@Component({
  name: 'Error404View',
  components: {Error},
})
export default class Error404View extends Vue {}
</script>

<style lang="scss" scoped>
</style>
