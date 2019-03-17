<template>
  <div class="user-login">
    <el-card shadow="always">
      <div class="user-login--cont-title">
        <h3>登录</h3>
      </div>
      <div class="user-login--cont-form">
        <el-form :model="form" ref="form" :rules="rules">
          <el-form-item prop="userAccount">
            <el-input size="big" v-model="form.userAccount"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input size="big" type="password" v-model="form.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="big" type="primary" :loading="loading" @click="onSignIn">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>
<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';
import {postLogin, UserVO} from '@/apis/auth';

@Component({
  name: 'LoginView',
})
export default class LoginView extends Vue {

  public loading: boolean = false;

  public form: UserVO = {
    userAccount: 'admin',
    password: '123456',
  };

  public rules = {
    userAccount: [{ required: true, trigger: 'blur', message: '用户名不能为空' }],
    password: [{ required: true, trigger: 'blur', message: '密码不能为空' }]
  };

  public async onAction() {
    this.loading = true;
    try {
      const r = await postLogin(this.form);
      if (r.data.code === 0) {
        this.$router.push({
          name: 'dashboard',
        });
      }
    } catch (e) {
    } finally {
      this.loading = false;
    }
  }

  public onSignIn() {
    // @ts-ignore
    this.$refs.form.validate(valid => {
      if (valid) {
        this.onAction()
      }
    })
  }
}
</script>
<style lang="scss" scoped>
.user-login {
  width: 400px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  &--cont-title {
    padding-bottom: $base-ratio-px * 2;

    h3 {
      font-size: $base-ratio-px * 3;
    }
  }

  .el-button {
    width: 100%;
  }
}

.el-card {
  /deep/ {
    .el-card__body {
      padding: $base-ratio-px * 4;
    }
  }
}
</style>
