---
to: "src/views/<%%= name.indexOf('/') > -1 ? h.inflection.dasherize(name.slice(0, name.indexOf('/'))) + '/' + h.inflection.dasherize(name.slice(name.indexOf('/') + 1)) : h.inflection.dasherize(name) + '/' + h.inflection.dasherize(name) %%>.vue"
---
<%%
  const compName = h.inflection.dasherize(name.slice(name.indexOf('/') + 1))
%%><template>
  <view-container title="页面标题">
  </view-container>
</template>
<script lang="ts">
  import {Component, Vue} from 'vue-property-decorator';

  @Component({
    name: '<%%= h.changeCase.pascal(compName) %%>View',
  })
  export default class <%%= h.changeCase.pascal(compName) %%>View extends Vue {}
</script>
<style lang="scss" scoped>
</style>
