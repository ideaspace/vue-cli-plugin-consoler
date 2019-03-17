import Vue from 'vue';
import Component from 'vue-class-component';
import {format, isValid} from 'date-fns';

@Component
export default class DateFormat extends Vue {
  public onFormatTime(val: number, formatString = 'YYYY-MM-DD HH:mm:ss') {
    if (val && isValid(new Date(val))) {
      return format(val, formatString);
    }
    return '- -';
  }
}
