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
        <template slot-scope="{row}">{{onFormatTime(row.createTime)}}</template>
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
        <template slot-scope="{row}">
          <el-icon :class="row.alertLevel === 'CRITICAL' ? 'is-status--error' : 'is-status--warning'"
                   :name="row.alertLevel === 'CRITICAL' ? 'warning' : 'info'"></el-icon>
          <span>{{ALERT_LEVEL_TEXT[row.alertLevel]}}</span></template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="{row}">
            <span :class="{
            'is-status--dot-firing':  ALERT_HISTORY_STATUS.FIRING === row.status,
            'is-status--dot-normal':  ALERT_HISTORY_STATUS.RECOVERED === row.status,
            'is-status--dot-warning':  ALERT_HISTORY_STATUS.PENDING === row.status,
            'is-status--dot-info':  ALERT_HISTORY_STATUS.CONFIRMED === row.status,
            'is-status--dot-processing': [ALERT_HISTORY_STATUS.FIRING, ALERT_HISTORY_STATUS.PENDING].indexOf(row.status) > -1,
          }"></span>
          <span>{{ALERT_HISTORY_STATUS_TEXT[row.status]}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="value" label="当前值">
        <template slot-scope="{row}">{{row.value ? (row.value).toFixed(2) : '- -'}}</template>
      </el-table-column>
      <el-table-column width="150" label="操作">
        <template slot-scope="{row}">
          <el-button type="text" @click="onOpenDialog(row)">详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-if="pageTotal > 10 "
      @current-change="val => onPageChange('pageNum', val)"
      @size-change="val => onPageChange('pageSize', val)"
      :current-page="page.pageNum"
      :total="pageTotal"
    ></el-pagination>
    <detail-dialog v-if="dialog.detail" :item-data="itemData" @on-close="onCloseDialog"></detail-dialog>
  </view-container>
</template>

<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator';
  import {ALERT_HISTORY_STATUS} from '@/dict-data';
  import {ALERT_HISTORY_STATUS_TEXT, ALERT_LEVEL_TEXT} from '@/dict-text';
  import HTTP_LIST, {ListVO} from '@/apis/list';
  import DetailDialog from './dialogs/Detail.vue';
  import PageData from '@/mixins/page_data';
  import DateFormat from '@/mixins/date_format';

  @Component({
    name: 'ListView',
    components: {DetailDialog},
  })
  export default class ListView extends Mixins(DateFormat, PageData) {
    public form = {
      dataCenter: '',
      dataCluster: '',
    };
    public dialog = {
      detail: false,
    };
    public loading: boolean = false;
    public alertList: ListVO[] = [];
    public itemData: ListVO = {};
    public ALERT_HISTORY_STATUS = ALERT_HISTORY_STATUS;
    public ALERT_HISTORY_STATUS_TEXT = ALERT_HISTORY_STATUS_TEXT;
    public ALERT_LEVEL_TEXT = ALERT_LEVEL_TEXT;

    public onOpenDialog(row: ListVO) {
      this.dialog.detail = true;
      this.itemData = row;
    }

    public onCloseDialog() {
      this.dialog.detail = false;
    }

    public async getTableList() {
      this.loading = true;
      try {
        const r = await HTTP_LIST.getTableList();
        if (r.data.code === 0) {
          this.alertList = r.data.data;
          this.pageTotal = [...r.data.data, ...r.data.data].length;
        }
      } catch (e) {
      } finally {
        this.loading = false;
      }
    }

    public onPageChange(type: string, val: number) {
      this.page[type] = val;
      this.getTableList();
    }

    public mounted() {
      this.getTableList();
    }
  }
</script>

<style lang="scss" scoped>
</style>
