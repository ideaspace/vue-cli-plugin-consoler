<template>
  <view-container title="MonitorServant" back-url="base-detail">
    <h4 class="mb-16">基本信息</h4>
    <el-row>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">应用名称</div>
          <div class="info-list--val">MonitorServant</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">应用编码</div>
          <div class="info-list--val">cd-monitor-servant</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">状态</div>
          <div class="info-list--val">已禁用</div>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="info-list">
          <div class="info-list--key">应用描述</div>
          <div class="info-list--val">
            <p>中国电信云计算公司运营的天翼云是一个运营商级别的一站式信息服务门户， 云计算产品主要包含云主机、云服务器、云存储、对象存储、CDN、内容分发、大数据、云桌面、大数据分析、云主机租用、云主机试用等。</p>
          </div>
        </div>
      </el-col>
    </el-row>
    <h4 class="mt-16">监控项信息</h4>
    <el-table :data="appItemList">
      <div class="empty" slot="empty">暂无数据</div>
      <el-table-column prop="applicationName" label="名称"></el-table-column>
      <el-table-column prop="monitorMode" label="类型"></el-table-column>
      <el-table-column prop="target" label="目标地址"></el-table-column>
      <el-table-column prop="exporterName" label="Export类型"></el-table-column>
      <el-table-column prop="code" label="监控状态">
        <template slot-scope="{row}">
            <span :class="{
            'is-status--dot-error':  row.monitorItemStatus === 0,
            'is-status--dot-normal':  row.monitorItemStatus === 1
           }"></span>
          <span>{{row.monitorItemStatus === 0 ? '未监控' : '已监控'}}</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="{row}">
          <el-button type="text">更多</el-button>
        </template>
      </el-table-column>
    </el-table>
  </view-container>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HTTP_APP, {AppItemVO} from '@/apis/app';

  @Component({
    name: 'InnerView',
  })
  export default class InnerView extends Vue {
    public appItemList: AppItemVO[] = [];

    public async getAppItemList() {
      try {
        const r = await HTTP_APP.getAppItem();
        if (r.data.code === 0) {
          this.appItemList = r.data.data;
        }
      } catch (e) {
      }
    }

    public mounted() {
      this.getAppItemList();
    }
  }
</script>
<style lang="scss" scoped>
</style>
