import {VueConstructor} from 'vue';
import ViewContainer from './layout/Container.vue';

interface CompsList {
  [key: string]: VueConstructor;
}

const Comps: CompsList = {
  ViewContainer,
};

const requireComps = require.context('@/components', true, /\.vue$/);

const requireSvgIcon = require.context('@/assets/icons', false, /\.svg$/);

requireComps.keys().forEach((filename) => {
  const compName = filename.slice(filename.lastIndexOf('/') + 1, -4);
  Comps[compName] = requireComps(filename).default;
});

requireSvgIcon.keys().forEach((fileName) => {
  requireSvgIcon(fileName);
});

export default Comps;
