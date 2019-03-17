import {VueConstructor} from 'vue';
import ViewContainer from './layout/Container.vue';
import SpinLoader from './spin/SpinLoader.vue';
import SvgIcon from './icon/SvgIcon.vue';
import CountTo from './count/CountTo.vue';
import TableTree from './table/TableTree.vue';

interface CompsList {
  [key: string]: VueConstructor;
}

export const Comps: CompsList = {
  ViewContainer,
  SpinLoader,
  SvgIcon,
  CountTo,
  TableTree,
};

const requireSvgIcon = require.context('@/assets/icons', false, /\.svg$/);

requireSvgIcon.keys().forEach((fileName) => {
  requireSvgIcon(fileName);
});
