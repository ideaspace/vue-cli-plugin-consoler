<template>
  <div class="error">
    <div class="error-type" :class="[`error-type--${type}`]"></div>
    <div v-if="message" class="error-message">
      {{message}}
    </div>
    <div class="error-operation">
      <el-button type="primary" size="small" @click="goHome()">返回首页</el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Error extends Vue {
  @Prop()
  private type!: string;
  @Prop()
  private message!: string;

  private goHome(): void {
    this.$router.push({
      name: 'dashboard',
    });
  }
}
</script>

<style scoped lang="scss">
.error {
  width: 50%;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  &-type, &-message, &-operation {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &-type {
    height: $base-ratio-px * 60 - 60;
    width: 100%;
    margin-top: $base-ratio-px * 3;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
  }
  &-message {
    margin-top: 3.2%;
    font-size: 14px;
    color: #777777;
    text-align: left;
  }
  &-operation {
    margin-top: 3.2%;
  }
}
.error-type {
  &--403 {
    background-image: url('./../../../assets/403.svg');
  }
  &--404 {
    background-image: url('./../../../assets/404.svg');
  }
  &--500 {
    background-image: url('./../../../assets/500.svg');
  }
}
</style>
