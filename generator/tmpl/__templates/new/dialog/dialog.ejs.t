---
to: "src/views/<%%= name.includes('/') ? h.inflection.dasherize(name.slice(0, name.indexOf('/'))) + '/dialogs/' + h.changeCase.pascal(name.slice(name.indexOf('/') + 1)) : h.inflection.dasherize(name) + '/dialogs/' + h.changeCase.pascal(name) %%>.vue"
---
<%%
  const compName = h.changeCase.pascal(name.slice(name.indexOf('/') + 1))
%%><template>
  <el-dialog title="" :visible="dialogVisible" @close="onClose">
    <div slot="footer" class="dialog-footer">
      <el-button @click="onClose">关闭</el-button>
      <el-button type="primary" @click="onConfirm">确认</el-button>
    </div>
  </el-dialog>
</template>
<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: '<%%= compName %%>Dialog'
  })
  export default class <%%= compName %%>Dialog extends Vue {
    public dialogVisible: boolean = true;
    public onConfirm () {
      this.onClose('confirm');
    }
    public onClose (type = 'dismiss') {
      this.dialogVisible = false;
      this.$emit('on-close', {
        name: '',
        visible: this.dialogVisible,
        type: type
      })
    }
  }
</script>
