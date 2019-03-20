import Vue from 'vue';

export function traverseTree(data: any[], parent: any, childKey: string, expandAll: boolean) {
  let temp: object[] = [];
  Array.from(data, (node) => {
    Vue.set(node, '_show', node.parent ? expandAll : true);
    if (parent) {
      Vue.set(node, '_parent', parent);
      Vue.set(node, '_level', parent._level + 1);
    } else {
      Vue.set(node, '_level', 0);
    }
    temp.push(node);
    if (node[childKey] && node[childKey].length > 0) {
      Vue.set(node, '_expand', expandAll);
      const child = traverseTree(node[childKey], node, childKey, expandAll);
      temp = temp.concat(child);
    }
  });
  return temp;
}
