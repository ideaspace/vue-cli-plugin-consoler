<template>
  <div
    class="wrap"
  >
    <div
      class="wrap-in"
    >
      <div class="brand">
        <div class="brand-logo"></div>
        <div class="brand-text">
          <span>天翼云</span>
          <span class="divider">|</span>
          <span>中后台前端集成方案</span>
        </div>
      </div>
      <router-view></router-view>
    </div>
  </div>
</template>
<script lang="ts">
  import Vue from 'vue';
  import {Component} from 'vue-property-decorator';

  @Component
  export default class LoginView extends Vue {
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
  background-color: $body-bg-color;
  background-image: linear-gradient(to bottom, #1d8ef5, #4ca9f7);
  overflow: hidden;
}
.wrap-in {
  position: relative;
  padding-top: 60px;
  height: 800px;
  width: 1240px;
  margin-right: auto;
  margin-left: auto;
  .brand {
    position: absolute;
    top: 0;
    height: 60px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .divider {
      margin: 0 8px;
    }
  }
  .brand-logo {
    width: 50px;
    height: 32px;
    margin-right: $base-ratio-px;
    background-image: url('../../assets/logo.svg');
    background-repeat: no-repeat;
    background-size: contain;
  }
  .brand-text {
    font-size: 18px;
    color: #fff;
  }
}
</style>
