<template>
  <el-dialog title="详情" :visible="dialogVisible" @close="onClose">
    <el-form>
      <el-form-item label="监控对象">
        {{itemData.fromTemplateName || '- -'}}
      </el-form-item>
      <el-form-item label="告警指标">
        {{itemData.fromTemplateName || '- -'}}
      </el-form-item>
      <el-form-item label="告警级别">
        {{ALERT_LEVEL_TEXT[itemData.alertLevel]}}
      </el-form-item>
      <el-form-item label="发生时间">
        {{itemData.durationTime < 1 ? '<1' : itemData.durationTime}}m
      </el-form-item>
      <el-form-item label="持续时间">
        {{itemData.fromTemplateName || '- -'}}
      </el-form-item>
      <el-form-item label="IP">
        {{itemData.instance || '- -'}}
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {ListVO} from '@/apis/list';
import {ALERT_LEVEL_TEXT} from '@/dict-text';

@Component({
  name: 'DetailDialog',
})
export default class DetailDialog extends Vue {
  @Prop({
    default: {},
  })
  public itemData!: ListVO;

  public dialogVisible: boolean = true;
  public ALERT_LEVEL_TEXT = ALERT_LEVEL_TEXT;
  public onConfirm() {
    this.onClose('confirm');
  }
  public onClose(type = 'dismiss') {
    this.dialogVisible = false;
    this.$emit('on-close', {
      name: 'detail',
      visible: this.dialogVisible,
      type,
    });
  }
}
</script>
