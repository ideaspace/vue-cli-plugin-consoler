<template>
  <div class="spin">
    <template v-if="type === 'init'">
      <div class="spin-loader--init">
        <div class="spin-loader--wrap">
          <div class="spin-loader"></div>
          <div class="spin-loader--circle">
            <div class="spin-loader--logo"></div>
          </div>
        </div>
        <div class="spin-loader--text">
          <slot name="text">{{text}}</slot>
        </div>
      </div>
    </template>
    <template v-if="type === 'circle'">
      <svg x="0px" y="0px" width="32px" height="32px" viewBox="0 0 150 150" class="spin-loader--round">
        <circle cx="75" cy="75" r="60" class="spin-loader--circle"></circle>
      </svg>
    </template>
    <template v-if="type === 'bar'">
      <svg class="spin-loader--bar" x="0px" y="0px"
           width="48px" height="30px" viewBox="0 0 24 30">
        <rect x="0" y="13" width="4" height="5">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="10" y="13" width="4" height="5">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.15s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
        <rect x="20" y="13" width="4" height="5">
          <animate
            attributeName="height"
            attributeType="XML"
            values="5;21;5"
            begin="0.3s" dur="0.6s"
            repeatCount="indefinite"
          />
          <animate
            attributeName="y"
            attributeType="XML"
            values="13; 5; 13"
            begin="0.3s"
            dur="0.6s"
            repeatCount="indefinite"
          />
        </rect>
      </svg>
    </template>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class SpinLoader extends Vue {
  @Prop({ default: 'Loading...' }) public text!: string;
  @Prop({ default: 'circle' }) public type!: string;
}
</script>
<style scoped lang="scss">
.spin {
  display: flex;
  align-items: center;
  flex-direction: column;
}
.spin-loader {
  height: 128px;
  width: 128px;
  margin: 0 auto;
  position: relative;
  border: 2px solid transparent;
  border-top: 2px solid #5094dc;
  border-radius: 100%;
  display: block;
  opacity: 0;
  box-sizing: border-box;
  animation: rotation .75s .5s infinite linear, fadeIn 1s .5s ease-in-out forwards;
  &--init {
    .spin-loader--circle {
      position: absolute;
      left: 4px;
      top: 4px;
      width: 120px;
      height: 120px;
      padding: 20px;
      background-color: #f9fbfb;
      border-radius: 50%;
      animation: bounceIn .5s ease-in-out;
      box-sizing: border-box;
    }
  }
  &--wrap {
    position: relative;
  }
  &--logo {
    position: absolute;
    top: 22px;
    left: 10px;
    background-image: url("data:image/png;base64,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");
    background-repeat: no-repeat;
    background-size: contain;
    height: 75px;
    width: 100px;
  }
  &--text {
    font-size: 14px;
    margin-top: 20px;
    color: #666;
    animation: fadeIn 1s ease-in-out;
    animation-fill-mode: forwards;
    opacity: 0;
    animation-delay: .3s;
    text-align: center;
  }
  &--round {
    animation: rotation 2s linear infinite;
    box-sizing: border-box;
  }
  &--circle {
    stroke-dashoffset: 600;
    stroke-dasharray: 300;
    stroke-width: 12;
    stroke-miterlimit: 10;
    stroke-linecap: round;
    animation: stroke 1.6s cubic-bezier(0.4, 0.15, 0.6, 0.85) infinite;
    stroke: #5094dc;
    fill: transparent;
  }
  &--bar {
    rect {
      fill: #5094dc;
    }
  }
}
</style>
