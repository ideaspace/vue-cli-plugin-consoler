<template>
  <error type="403" message="抱歉，您没有权限访问该页面"></error>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import Error from '@/views/error/comps/Error.vue';

@Component({
  name: 'Error403View',
  components: {Error},
})
export default class Error403View extends Vue {}
</script>

<style lang="scss" scoped>
</style>
