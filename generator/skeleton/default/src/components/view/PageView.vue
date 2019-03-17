<template>
  <div
    class="wrap"
  >
    <header-wrapper></header-wrapper>
    <div
      class="wrap-in"
    >
      <aside-wrapper @on-toggle="onToggle"></aside-wrapper>
      <div
        class="main main-scroll"
        :class="{
          'is-narrow': !isCollapseMenu
        }"
      >
        <router-view v-if="!loading" />
        <spin-loader v-if="loading" type="bar"></spin-loader>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HeaderWrapper from '../layout/Header.vue';
  import AsideWrapper from '../layout/Aside.vue';
  import {Getter} from 'vuex-class';

  @Component({
    components: {
      HeaderWrapper,
      AsideWrapper,
    },
  })
  export default class PageView extends Vue {

    @Getter('container/loading')
    public loading: boolean;

    private isCollapseMenu: boolean = true;

    public onToggle(collapse: boolean) {
      this.isCollapseMenu = collapse;
    }
  }
</script>
<style lang="scss" scoped>
.wrap {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  height: 100%;
  background-color: $white-color;
  overflow: hidden;
  &.is-home {
    background-color: $body-bg-color;
  }
}
.wrap-in {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: $top-bar-height;
  &.is-wide {
    left: 64px;
  }
}
.main {
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  left: $aside-menu-collapse-width;
  overflow-x: hidden;
  overflow-y: auto;
  transition: all .3s ease;
  background-color: $white-color;
  &.is-narrow {
    left: $aside-menu-width;
  }
  .spin {
    position: relative;
    top: 50%;
    transform: translateY(-50%) scale(1.2);
  }
}
</style>
