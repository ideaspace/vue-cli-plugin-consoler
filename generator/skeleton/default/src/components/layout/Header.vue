<template>
  <div class="header-wrapper">
    <div class="header-cont">
      <div class="header-cont--brand-wrapper">
        <div class="brand-img"></div>
        <div class="brand-text">{{title}}</div>
      </div>
      <div class="header-cont--panel-wrapper">
        <div class="header-cont--panel">
          <div class="header-cont--user-meta">
            <div class="header-cont--user-meta-avatar"></div>
            <div class="header-cont--user-meta-name">
              <el-dropdown @command="val => onMenuSelect('action', val)">
              <span class="el-dropdown-link">
                <span>{{username}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="changePwd">修改密码</el-dropdown-item>
                  <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </div>
        </div>
        <%_ if (options.helpLink) { _%>
        <div class="header-cont--panel">
          <el-dropdown @command="val => onMenuSelect('help', val)">
            <span class="header-cont--panel-help">
              <el-icon name="question"></el-icon>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item
                command=""
              >帮助文档</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <%_ } _%>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import {postLogout} from '@/apis/auth';

@Component
export default class HeaderWrapper extends Vue {
  public title = require('./../../app.config.ts').title;
  public get username() {
    return this.$store.state.user.username;
  }
  public onMenuSelect(type:string, val: string) {
    if (type === 'action') {
      if (val === 'logout') {
        this.userLogout();
      }
      if (val === 'changePwd') {
        this.$router.push({
          name: 'user-modify-password'
        });
      }
    }
    <%_ if (options.helpLink) { _%>
    if (type === "help") {
      window.open(val, "_blank");
    }
    <%_ } _%>
  }
  public async userLogout() {
    try {
      const r = await postLogout();
      if (r.data.code === 0) {
        this.$store.dispatch('menu/deleteMenuData');
        this.$store.dispatch('user/deleteUserData');
        location.href = '/#/auth/login';
      }
    } catch (e) {
    }
  }
}
</script>
<style lang="scss" scoped>
.header-wrapper {
  position: relative;
  z-index: $zIndex-1011;
  height: $top-bar-height;
}

.header-cont {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: $top-bar-height;
  background-color: $aside-menu-bg-color;
  &--panel {
    padding-right: $base-ratio-px;
  }
  &--panel-wrapper {
    display: flex;
    align-items: center;
  }
  &--brand-wrapper {
    height: $top-bar-height;
    overflow: hidden;
    color: #fff;
    padding-left: 10px;
    line-height: $top-bar-height;
    font-size: 0;
    .brand-img {
      display: inline-block;
      background-image: url("../../assets/logo.svg");
      background-repeat: no-repeat;
      background-size: contain;
      width: 40px;
      height: 26px;
      text-align: center;
      vertical-align: middle;
    }

    .brand-text {
      display: inline-block;
      margin-left: 12px;
      font-size: 16px;
      vertical-align: middle;
      transition: all .1s ease;
    }
  }
  &--panel-help {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #b3b5b6;
    &:hover {
      border-radius: 50%;
      background-color: #383f45;
    }
    @include square($base-ratio * 3)
  }
}

.el-dropdown-link {
  cursor: pointer;
  color: $white-color;
}
</style>
