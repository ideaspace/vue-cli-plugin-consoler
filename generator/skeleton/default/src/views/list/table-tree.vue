<template>
  <view-container title="表格树">
    <table-tree :data="tableData">
      <el-table-column slot="first" prop="vName" label="服务"></el-table-column>
      <el-table-column prop="vIpPort" label="IP端口"></el-table-column>
      <el-table-column prop="status" label="状态"></el-table-column>
      <el-table-column prop="userData" label="用户数据"></el-table-column>
      <el-table-column prop="timestamp" label="时间">
        <template slot-scope="scope">
          {{onFormatTime(scope.row.timestamp)}}
        </template>
      </el-table-column>
      <el-table-column prop="serverDuration" label="时间轴"></el-table-column>
    </table-tree>
  </view-container>
</template>
<script lang="ts">
  import {Component, Mixins} from 'vue-property-decorator';
  import DateFormat from '@/mixins/date_format';

  @Component({
    name: 'TableTreeView',
  })
  export default class TableTreeView extends Mixins(DateFormat) {
    public tableData = {
      parentId: null,
      duration: 8,
      serverDuration: 8,
      srDelay: 0,
      crDelay: 0,
      clientApp: '',
      serverApp: 'devopstest',
      status: 'ok',
      userData: 'hello world',
      timestamp: 1539853072324,
      vName: 'devopstest-member',
      vIpPort: '192.168.224.1:8778',
      level: 0,
      children: [
        {
          parentId: 'a4eaa9a42c624cf6',
          serverDuration: 0,
          status: 'ok',
          error: null,
          userData: 'hello world',
          timestamp: 1539853072325,
          vName: 'devopstest-test',
          vIpPort: '192.168.224.1:8779',
          vMethod: 'UserController#getUser',
          level: 1,
          children: null,
          timeOffset: 1,
        },
        {
          parentId: 'a4eaa9a42c624cf6',
          serverDuration: 3,
          status: 'ok',
          userData: 'hello world',
          timestamp: 1539853072327,
          spanType: 'SERVICE',
          count: 0,
          vName: 'devopstest-user',
          vIpPort: '192.168.224.1:8756',
          vMethod: 'UserController#getUser',
          level: 1,
          children: [
            {
              parentId: '33f1a1681aa2e6d6',
              serverDuration: 1,
              status: 'ok',
              userData: 'hello world',
              tenantCode: 'aep',
              timestamp: 1539853072328,
              spanType: 'SERVICE',
              count: 0,
              vName: 'devopstest-data',
              vIpPort: '192.168.224.1:8776',
              vMethod: 'DataController#getById',
              level: 2,
              children: null,
              timeOffset: 4,
            },
          ],
          timeOffset: 3,
        },
      ],
      timeOffset: 0,
    };
  }
</script>
<style lang="scss" scoped>
</style>
