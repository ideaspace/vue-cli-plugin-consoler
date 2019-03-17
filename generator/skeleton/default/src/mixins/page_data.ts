import Vue from 'vue';
import Component from 'vue-class-component';

interface PageVO {
  [key: string]: any;
  pageNow: number;
  pageSize: number;
}

@Component
export default class PageData extends Vue {
  public page: PageVO = {
    pageNow: 1,
    pageSize: 10,
  };
  public pageTotal: number = 0;
}
