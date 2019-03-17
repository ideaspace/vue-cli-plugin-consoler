<template>
  <view-container title="基础详情">
    <h4 class="mb-16">基本信息</h4>
    <el-row>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">模板名称</div>
          <div class="info-list--val">日志</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">数据中心</div>
          <div class="info-list--val">深圳</div>
        </div>
      </el-col>
      <el-col :span="8">
        <div class="info-list">
          <div class="info-list--key">状态</div>
          <div class="info-list--val">已应用</div>
        </div>
      </el-col>
    </el-row>
    <h4 class="mt-8">应用信息</h4>
    <el-table :data="appList">
      <div class="empty" slot="empty">暂无数据，立即
        <el-button type="text">新增</el-button>
      </div>
      <el-table-column prop="name" label="应用名称">
        <template slot="header" slot-scope="{row}">
          <span>应用名称</span>
          <el-popover
            placement="top"
            width="320"
            v-model="popover">
            <el-input
              @keyup.native.enter="onSearch"
              v-model="name"
              size="mini"
              placeholder="请输入应用名按回车搜索"/>
            <el-button slot="reference" type="text" icon="el-icon-search"></el-button>
          </el-popover>
        </template>
        <template slot-scope="{row}">
          <el-button type="text" @click="$router.push({name: 'inner-detail'})">{{row.name}}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="code" label="应用编码"></el-table-column>
      <el-table-column prop="dataCenterName" label="应用分组"></el-table-column>
      <el-table-column prop="monitorItemNum" label="监控项数量"></el-table-column>
      <el-table-column prop="alertDisabled" label="屏蔽告警">
        <template slot="header" slot-scope="scope">
          屏蔽告警
          <el-tooltip class="item" effect="dark" content="如果屏蔽告警，则该应用相关的指标将不参与告警规则计算" placement="top"><i
            class="el-icon-question"></i></el-tooltip>
        </template>
        <template slot-scope="{row}">
          <span>否</span>
        </template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="$router.push({name: 'inner-detail'})">查看</el-button>
          <el-dropdown>
            <el-button type="text" class="option-bth">更多</el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>屏蔽告警</el-dropdown-item>
              <el-dropdown-item>编辑</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>
      </el-table-column>
    </el-table>
  </view-container>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';
  import HTTP_APP, {AppListVO} from '@/apis/app';

  @Component({
    name: 'PageView',
  })
  export default class PageView extends Vue {
    public popover: boolean = false;
    public name: string = '';
    public appList: AppListVO[] = [];

    public async getAppList() {
      try {
        const r = await HTTP_APP.getAppList();
        if (r.data.code === 0) {
          this.appList = r.data.data;
        }
      } catch (e) {
      }
    }

    public onSearch() {}

    public mounted() {
      this.getAppList();
    }
  }
</script>

<style lang="scss" scoped>
</style>
