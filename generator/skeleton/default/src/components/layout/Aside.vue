<template>
  <aside
    class="aside-wrapper"
    :class="{
      'is-collapse': isCollapse
    }"
  >
    <div
      class="aside-menu menu-scroll"
      @mouseenter="onMouseEnter"
      @mouseleave="onMouseLeave"
    >
      <el-menu
        :unique-opened="true"
        background-color="#252a2e"
        text-color="#b9bbbe"
        active-text-color="#383f45"
        @open="onMenuOpen"
        @close="onMenuClose"
        ref="menu"
      >
        <template v-for="menu of menuList">
          <el-menu-item
            v-if="!menu.hasChildren"
            @click="onSelect(menu)"
            :index="menu.urlAddr"
          >
            <div class="item-icon">
              <svg-icon :name="menu.menuIcon"></svg-icon>
            </div>
            <span :data-url="menu.urlAddr" slot="title" class="item-title">{{menu.menuName}}</span>
          </el-menu-item>
          <el-submenu :data-idx="menu.menuId" v-else :index="menu.menuId + ''">
            <template slot="title">
              <div class="item-icon">
                <svg-icon :name="menu.menuIcon"></svg-icon>
              </div>
              <span slot="title" class="item-title">{{menu.menuName}}</span>
            </template>
            <el-menu-item
              @click="onSelect(item)"
              v-for="item of menu.items" :key="item.menuId" :index="item.urlAddr">
              <span :data-url="item.urlAddr" class="item-title" slot="title">{{item.menuName}}</span>
            </el-menu-item>
          </el-submenu>
        </template>
      </el-menu>
    </div>
    <div class="aside-menu--trigger">
      <span @click="onToggleMenu">
        <svg-icon :name="`${isCollapse? 'indent' :'outdent'}`"></svg-icon>
      </span>
    </div>
  </aside>
</template>

<script lang="ts">
import {Component, Watch, Vue} from 'vue-property-decorator';
import {Getter} from 'vuex-class';
import {MenuVO} from '@/apis/menu';

/**
 * helper function to traverse the menuTree
 * @param src
 * @param target
 * @param key
 * @return parentMenuId
 */
const traverse = (src: MenuVO[], target: string, key?: number) => {
  if (key) {
    return key;
  }
  let menuKey: number = -1;
  Array.from(src).some((menu: MenuVO): boolean => {
    if (menu.urlAddr === target) {
      menuKey = menu.menuId;
      return true;
    }
    if (menu.items && menu.items.length) {
      menu.items.some((item: MenuVO): boolean => {
        if (item.parMenuId === menu.menuId) {
          if (item.urlAddr === target) {
            menuKey = item.parMenuId;
            return true;
          }
        }
        traverse([item], target, menuKey);
        return false;
      });
    }
    return false;
  });
  return menuKey;
};

@Component
export default class AsideWrapper extends Vue {

  @Getter('menu/menuTree')
  public menuList!: MenuVO[];

  public openMenuKey: number | undefined;
  public isCollapse: boolean = true;
  public isOpenLock: boolean = false;

  public onSelect({urlAddr}: MenuVO) {
    this.$router.push({name: urlAddr});
  }

  public onToggleMenu() {
    this.isCollapse = !this.isCollapse;
    this.isOpenLock = !this.isCollapse;
    if (this.openMenuKey) {
      const type = this.isCollapse ? 'closeMenu' : 'openMenu';
      // @ts-ignore
      this.$refs.menu[type](this.openMenuKey, !this.isCollapse && this.$route.name);
    }
    this.$emit('on-toggle', this.isCollapse);
  }

  public onMouseEnter() {
    if (this.isOpenLock) {
      return;
    }
    if (
      this.openMenuKey &&
      // @ts-ignore
      this.$refs.menu.submenus[this.openMenuKey] // ts:disable
    ) {
      // @ts-ignore
      this.$refs.menu.openMenu(this.openMenuKey, this.$route.name);
    }
    this.isCollapse = false;
  }

  public onMouseLeave() {
    if (this.isOpenLock) {
      return;
    }
    if (this.openMenuKey) {
      // @ts-ignore
      this.$refs.menu.closeMenu(this.openMenuKey);
    }
    this.isCollapse = true;
  }

  public onMenuOpen(key: number) {
    this.openMenuKey = key;
  }

  public onMenuClose() {
    this.openMenuKey = undefined;
  }

  public mounted() {
    this.openMenuKey = traverse(this.menuList, this.$route.name || '');
    // @ts-ignore
    this.$refs.menu.activeIndex = this.$route.meta.bind || this.$route.name;
  }

  @Watch('$route.name')
  public onRouteChange(newVal: string) {
    // @ts-ignore
    this.$refs.menu.activeIndex = this.$route.meta.bind || newVal;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
%item-menu {
  display: inline-block;
  margin-left: 22px;
  font-size: 14px;
  color: #eee !important;
  line-height: normal;
}

%item-icon {
  margin-left: 2px;
  display: inline-block;
  width: 16px;
  height: 20px;
  line-height: normal;
}

.aside-wrapper {
  width: $aside-menu-width;
  background-color: $aside-menu-bg-color;
  position: absolute;
  z-index: $zIndex-1010;
  top: 0;
  left: 0;
  bottom: 0;
  transition: all .3s ease;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .15);
  overflow: hidden;

  .item-title {
    transition: all .3s ease;
  }

  &.is-collapse {
    width: $aside-menu-collapse-width;
  }
}

.el-menu {
  border-right: 0;
  transition: all .3s ease;
  width: auto;

  /deep/ {
    .svg-icon {
      fill: rgba(255, 255, 255, .65);
    }
  }
}

.el-menu-item {
  line-height: $aside-menu-height;
  height: $aside-menu-height;
  display: flex;
  align-items: center;
  background-color: $aside-menu-bg-color;

  &.is-active {
    color: $primary-color !important;
    background-color: $aside-menu-item-hover-color !important;
  }

  .item-icon {
    @extend %item-icon
  }

  .item-title {
    @extend %item-menu
  }
}

.el-submenu__title {
  .item-title {
    @extend %item-menu
  }

  .item-icon {
    @extend %item-icon
  }
}

.el-submenu {
  background-color: $aside-menu-bg-color;

  &.is-active {
    /deep/ {
      .el-submenu__title {
        background-color: #383f45 !important;
      }
    }
  }

  /deep/ {
    .el-menu-item,
    .el-submenu__title {
      display: flex;
      align-items: center;
      height: $aside-menu-height;
    }
  }
}

.aside-menu {
  position: absolute;
  bottom: $top-bar-height;
  top: 0;
  width: $aside-menu-width;
  overflow-y: auto;
  overflow-x: hidden;
  transition: all .3s ease;
  border-top: 1px solid hsla(0, 0%, 100%, .1);

  &--trigger {
    display: flex;
    justify-content: left;
    align-items: center;
    border-top: 1px solid hsla(0, 0%, 100%, .1);
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    height: $top-bar-height;
    padding-left: 8px;

    > span {
      display: inline-block;
      height: 32px;
      width: 32px;
      line-height: 32px;
      border-radius: 100%;
      cursor: pointer;
      text-align: center;

      svg {
        height: 14px;
        width: 14px;
        fill: #b9bbbe;
      }

      &:hover {
        background-color: rgba(255, 255, 255, .15);
      }
    }
  }
}
</style>
