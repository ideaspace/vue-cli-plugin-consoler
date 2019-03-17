<template>
  <svg class="svg-icon" height="16px" width="16px">
    <use :xlink:href="iconName"/>
  </svg>
</template>

<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component
  export default class SvgIcon extends Vue {
    @Prop({default: ''})
    private name!: string;

    get iconName() {
      return `#${this.name}`;
    }
  }
</script>
<style lang="scss" scoped>
  .svg-icon {
    height: 100%;
    width: 100%;
    display: inline-block;
    font-size: 0;
    vertical-align: middle;
  }
</style>