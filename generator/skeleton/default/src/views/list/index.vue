<template>
  <view-container title="查询表格">
    <el-form :model="form" :inline="true">
      <el-form-item label="数据中心">
        <el-input v-model="form.dataCenter"></el-input>
      </el-form-item>
      <el-form-item label="数据集群">
        <el-input v-model="form.dataCluster"></el-input>
      </el-form-item>
      <el-form-item label="">
        <el-button type="primary">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="loading" :data="alertList">
      <div class="empty" slot="empty">暂未发现任何告警</div>
      <el-table-column prop="createTime" label="发生时间">
        <template slot-scope="scope">{{onFormatTime(scope.row.createTime)}}</template>
      </el-table-column>
      <el-table-column prop="instance" label="IP"></el-table-column>
      <el-table-column prop="fromTemplateName" label="监控对象"></el-table-column>
      <el-table-column prop="alertName" label="告警指标"></el-table-column>
      <el-table-column prop="durationTime" label="持续时间(m)">
        <template slot-scope="{row}">
          {{row.durationTime < 1 ? '<1' : row.durationTime}}m
        </template>
      </el-table-column>
      <el-table-column prop="alertLevel" label="告警级别">
        <template slot-scope="scope">
          <el-icon :class="scope.row.alertLevel === 'CRITICAL' ? 'is-status--error' : 'is-status--warning'" :name="scope.row.alertLevel === 'CRITICAL' ? 'warning' : 'info'"></el-icon>
          <span>{{ALERT_LEVEL_TEXT[scope.row.alertLevel]}}</span></template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
            <span :class="{
            'is-status--dot-firing':  ALERT_HISTORY_STATUS.FIRING === scope.row.status,
            'is-status--dot-normal':  ALERT_HISTORY_STATUS.RECOVERED === scope.row.status,
            'is-status--dot-warning':  ALERT_HISTORY_STATUS.PENDING === scope.row.status,
            'is-status--dot-info':  ALERT_HISTORY_STATUS.CONFIRMED === scope.row.status,
            'is-status--dot-processing': [ALERT_HISTORY_STATUS.FIRING, ALERT_HISTORY_STATUS.PENDING].indexOf(scope.row.status) > -1,
          }"></span>
          <span>{{ALERT_HISTORY_STATUS_TEXT[scope.row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="当前值">
        <template slot-scope="{row}">{{row.value ? (row.value).toFixed(2) : '- -'}}</template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="scope">
          <el-button type="text">详情</el-button>
          <el-button type="text">确认</el-button>
        </template>
      </el-table-column>
    </el-table>
  </view-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {ALERT_HISTORY_STATUS} from '@/dict-data';
import {ALERT_HISTORY_STATUS_TEXT, ALERT_LEVEL_TEXT} from '@/dict-text';
import HTTP_LIST, {ListVO} from '@/apis/list';

@Component({
  name: 'ListView',
})
export default class ListView extends Vue {
  public form = {
    dataCenter: '',
    dataCluster: ''
  };
  public loading: boolean = false;
  public alertList: ListVO[] = [];
  public ALERT_HISTORY_STATUS = ALERT_HISTORY_STATUS;
  public ALERT_HISTORY_STATUS_TEXT = ALERT_HISTORY_STATUS_TEXT;
  public ALERT_LEVEL_TEXT = ALERT_LEVEL_TEXT;
  public async getTableList() {
    this.loading = true;
    try {
      const r = await HTTP_LIST.getTableList();
      if (r.data.code === 0) {
        this.alertList = r.data.data;
      }
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }
  public mounted() {
    this.getTableList();
  }
}
</script>

<style lang="scss" scoped>
</style>
