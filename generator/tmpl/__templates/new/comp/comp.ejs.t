<%='---'%>
to: "src/views/<%%= name.indexOf('/') > -1 ? h.inflection.dasherize(name.slice(0, name.indexOf('/'))) + '/comps/' + h.changeCase.pascal(name.slice(name.indexOf('/') + 1)) : h.inflection.dasherize(name) + '/comps/' + h.changeCase.pascal(name) %%>.vue"
<%='---'%>
<%%
  const compName = h.changeCase.pascal(name.slice(name.indexOf('/') + 1))
%%><template>
</template>
<script lang="ts">
  import {Component, Prop, Vue} from 'vue-property-decorator';

  @Component({
    name: '<%%= compName %%>Comp'
  })
  export default class <%%= compName %%>Comp extends Vue {
  }
</script>
