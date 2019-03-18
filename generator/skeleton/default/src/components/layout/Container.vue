<template>
  <div class="view-container">
    <div class="view-head" v-if="showHead">
      <div class="view-head--cont">
        <!--<div class="view-head&#45;&#45;breadcrumb">-->
        <!--<el-breadcrumb separator="/">-->
        <!--<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>-->
        <!--<el-breadcrumb-item v-for="(v, idx) in breadcrumbList" :key="idx">-->
        <!--<router-link :to="{name: v.urlAddr}" v-if="v.urlAddr">{{v.menuName}}</router-link>-->
        <!--<span v-else>{{v.menuName}}</span>-->
        <!--</el-breadcrumb-item>-->
        <!--</el-breadcrumb>-->
        <!--</div>-->
        <div class="view-head--back" v-if="hasUrl">
          <el-button type="text" icon="el-icon-back" @click="onBack"></el-button>
        </div>
        <div class="view-head--info">
          <h2 class="view-head--info-title">{{title || $route.meta.title }}</h2>
          <div class="view-head--info-cont" v-if="$slots.info">
            <slot name="info"></slot>
          </div>
        </div>
        <div class="view-head--meta" v-if="$slots.meta">
          <slot name="meta"></slot>
        </div>
      </div>
    </div>
    <div class="view-body">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Getter } from 'vuex-class';

@Component
export default class ViewContainer extends Vue {

  @Prop({ type: Boolean, default: true })
  public showHead!: boolean;

  @Prop({
    default: '',
  })
  public title!: string;

  @Prop(String)
  public backUrl!: string;

  public get fromName() {
    return this.$store.state.menu.fromName;
  }

  public get hasUrl() {
    if (this.backUrl === '' && this.fromName === '') {
      return false;
    }
    return this.backUrl !== undefined;
  }

  public onBack() {
    this.$router.push({
      name: this.backUrl || this.fromName,
      params: this.$route.params,
      query: this.$route.query,
    });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-head {
  &--cont {
    display: flex;
    align-items: center;
    background: #fff;
    padding: 0 $base-ratio-px * 3;
    height: 50px;
    border-bottom: 1px solid #d9d9d9;
  }
  &--back {
    margin-left: -$base-ratio-px;
    margin-right: $base-ratio-px;
  }
  &--info,
  &--meta {
    display: inline-block;
    width: 100%;
  }
  &--info-title {
    float: left;
    font-size: $base-ratio-px * 2;
    font-weight: 500;
    color: rgba(0, 0, 0, 0.85);
  }
  &--info-cont {
    float: right;
  }

  .el-breadcrumb {
    line-height: normal;
    margin-bottom: 16px;
  }

  .el-button {
    color: rgb(66, 90, 112);
    padding: $base-ratio-px / 2;
    border-radius: $border-radius;
    background-color: transparent;
    &:hover {
      background-color: $item-hover-color;
    }
  }
  /deep/ {
    .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: rgba(0, 0, 0, 0.45);
        font-weight: normal;
      }
    }
  }
}
.view-body {
  margin: $base-ratio-px * 3;
}
</style>
