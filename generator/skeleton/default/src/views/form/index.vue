<template>
  <view-container title="基础表单">
    <el-row>
      <el-col :span="10">
        <el-form :model="form" ref="form" label-width="120px">
          <el-form-item label="租户名称">
            <el-input v-model="form.tenantName"></el-input>
          </el-form-item>
          <el-form-item label="租户编码">
            <el-input v-model="form.tenantCode"></el-input>
          </el-form-item>
          <el-form-item label="联系人姓名">
            <el-input v-model="form.contactName"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="form.contactPhone"></el-input>
          </el-form-item>
          <el-form-item label="联系人地址">
            <el-input v-model="form.contactAddress"></el-input>
          </el-form-item>
          <el-form-item label="联系人邮箱">
            <el-input v-model="form.contactEmail"></el-input>
          </el-form-item>
          <el-form-item label="备注信息">
            <el-input :rows="5" type="textarea" v-model="form.remark"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">保存</el-button>
            <el-button>取消</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </view-container>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

@Component({
  name: 'FormView',
})
export default class FormView extends Vue {
  public form = {
    tenantName: '',
    tenantCode: '',
    contactName: '',
    contactPhone: '',
    contactAddress: '',
    contactEmail: '',
    remark: '',
  };
}
</script>

<style lang="scss" scoped>
</style>
