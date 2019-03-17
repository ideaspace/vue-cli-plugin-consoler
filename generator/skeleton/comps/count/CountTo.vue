<template>
  <div class="count-to--wrap" :class="classes">
    <div class="count-to--cont">
      <span class="count-to--prefix" v-if="prefix">{{prefix}}</span>
      <span class="count-to--value">{{countValue || '- -'}}</span>
      <span class="count-to--prefix" v-if="suffix">{{suffix}}</span>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Provide, Watch, Vue } from 'vue-property-decorator';
import CountedTo from './counted-to';
@Component
export default class CountTo extends Vue {

  get classes() {
    return `text-${this.align}`;
  }

  public countValue: number = 0;

  public counted: any;
  @Prop({ default: 0 })
  private startValue!: number;

  @Prop({ default: 0 })
  private endValue!: number;

  @Prop({ default: '' })
  private prefix!: string;

  @Prop({ default: '' })
  private suffix!: string;

  @Prop({ default: 2000 })
  private duration!: number;

  @Prop({ default: 'center' })
  private align!: string;

  @Watch('startValue')
  public onStartValueChange() {
    this.counted.startTo();
  }

  @Watch('endValue')
  public onEndValueChange(value) {
    this.counted.startTo(value, (val: number) => {
      this.countValue = val;
    });
  }

  public mounted() {
    this.startTo();
  }

  public startTo() {
    this.counted = new CountedTo({
      ...this.$props,
    }).startTo(this.endValue, (val: number) => {
      this.countValue = val;
    });
  }
}
</script>
<style lang="scss" scoped>
.count-to {
  &--wrap {
    &.text-left {
      text-align: left;
    }
    &.text-right {
      text-align: right;
    }
    &.text-center {
      text-align: center;
    }
  }
  &--cont {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    font-size: 24px;
  }
  &--prefix {
    margin-right: 8px;
  }
  &--suffix {
    margin-left: 8px;
  }
}
</style>
