<template>
  <view-container title="指标查询">
    <el-row>
      <el-col :span="12" :offset="6">
        <el-input
          @keyup.native.enter="getMetricList"
          @clear="getMetricList"
          v-model="q.query"
          disabled
          placeholder="请输入查询表达式搜索"
        >
          <template slot="append">
            <el-button disabled @click="getMetricList"><i class="el-icon-search"></i></el-button>
          </template>
        </el-input>
      </el-col>
    </el-row>
    <div class="mt-24">
      <div class="info-list">
        <div class="info-list--key">查询耗时</div>
        <div class="info-list--val">{{costTime}}ms</div>
      </div>
      <div class="info-list">
        <div class="info-list--key">总记录数</div>
        <div class="info-list--val">{{pageTotal}}条</div>
      </div>
    </div>
    <el-table class="mt-0" :data="metrics">
      <div class="empty" slot="empty">暂无数据</div>
      <el-table-column prop="element" label="结果" :show-overflow-tooltip="false"></el-table-column>
      <el-table-column width="100" prop="value" label="当前值"></el-table-column>
    </el-table>
  </view-container>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: 'SearchView',
  })
  export default class SearchView extends Vue {
    public q = {};
    public costTime = 2;
    public pageTotal = 100;
    public metrics = [];

    public getMetricList() {
    }
  }
</script>
<style lang="scss" scoped>
</style>
