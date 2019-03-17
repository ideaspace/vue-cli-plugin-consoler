<template>
  <el-table :data="formatData" :row-style="rowStyle" v-bind="$attrs">
    <el-table-column :prop="firstColumn.prop" :label="firstColumn.label">
      <template slot-scope="{row, $index}">
        <span
          class="caret"
          :style="{
              paddingLeft: `${row._level * 16}px`
            }"
          @click.stop="onToggleExpand(row, $index)"
          v-if="row[childKey] && row[childKey].length"
        >
          <el-icon :name="row._expand ? 'caret-bottom' : 'caret-right'"></el-icon>
        </span>
        <span
          :style="{
              paddingLeft: !row[childKey] ? `${row._level * 16 + 16}px` : '4px'
            }"
        >{{firstColumn.prop ? row[firstColumn.prop] : $index}}</span>
      </template>
    </el-table-column>
    <slot/>
  </el-table>
</template>
<script lang="ts">
import { traverseTree } from './traverseTree';
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class TableTree extends Vue {
  @Prop()
  private data!: object;

  @Prop({ default: false })
  private expand!: boolean;

  @Prop({ default: 'children' })
  private childKey!: string;

  get formatData() {
    const temp = Array.isArray(this.data) ? this.data : Array.of(this.data);
    return traverseTree(
      temp,
      null,
      this.childKey,
      this.expand,
    );
  }

  public get firstColumn() {
    // @ts-ignore
    return this.$slots.first && this.$slots.first[0]
      ? this.$slots.first[0].componentOptions.propsData
      : {};
  }

  public rowStyle(row: any) {
    const show = row.row._parent
      ? row.row._parent._expand && row.row._parent._show
      : true;
    row.row._show = show;
    return show ? 'display: block' : 'display:none';
  }

  public onToggleExpand(row: any, $index: number) {
    row._expand = !row._expand;
    const record: any = this.formatData[$index];
    record._show = !record._show;
  }
}
</script>
<style lang="scss" scoped>
</style>
