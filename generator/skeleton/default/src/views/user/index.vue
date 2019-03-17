<template>
  <view-container title="修改密码">
    <el-row>
      <el-col :span="8">
        <el-form :model="changePwdForm" ref="changePwdForm" :rules="rules" label-width="120px">
          <el-form-item prop="password" label="输入原密码">
            <el-input
                    v-model.trim="changePwdForm.password"
                    autocomplete="off"
                    type="password"
                    placeholder="输入原密码"
            ></el-input>
          </el-form-item>
          <el-form-item prop="newPassword" label="输入新密码">
            <el-input
                    v-model.trim="changePwdForm.newPassword"
                    placeholder="支持大小写英文字母、数字，长度6-20个字符"
                    :maxlength="20"
                    :minlength="6"
                    type="password"
                    autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item prop="checkPassword" label="确认新密码">
            <el-input
                    v-model.trim="changePwdForm.checkPassword"
                    type="password"
                    :maxlength="18"
                    :minlength="6"
                    placeholder="请确认密码"
                    autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onConfirm">确认</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </view-container>
</template>

<script lang="ts">
import {Component, Vue} from 'vue-property-decorator';

interface FormVO {
  password?: '';
  newPassword?: '';
  checkPassword?: '';
}

@Component({
  name: 'UserView',
})
export default class UserView extends Vue {
  public changePwdForm: FormVO = {
    password: '',
    newPassword: '',
    checkPassword: '',
  };

  public rules = {
    password: [
      {
        // @ts-ignore
        validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请输入密码'));
          } else {
            callback();
          }
        },
        trigger: 'blur',
        type: 'string',
      },
    ],
    newPassword: [
      {
        min: 6,
        max: 20,
        message: '长度在 6 到 20 个字符之间',
        trigger: 'blur',
        type: 'string',
      },
      {
        // @ts-ignore
        validator: (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.changePwdForm.checkPassword !== '') {
              // @ts-ignore
              this.$refs.changePwdForm.validateField('checkPassword');
            }
            callback();
          }
          callback();
        },
        trigger: 'blur',
      },
    ],
    checkPassword: [
      {
        min: 6,
        max: 20,
        message: '长度在 6 到 20 个字符之间',
        trigger: 'blur',
        type: 'string',
      },
      {
        // @ts-ignore
        validator: (rule, value, callback) => {
          if (!value) {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.changePwdForm.newPassword) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        },
        trigger: 'blur',
      },
    ],
  };

  public onConfirm() {
    // @ts-ignore
    this.$refs.changePwdForm.validate((valid) => {
      if (valid) {
        // your code
      }
    });
  }
}
</script>

<style lang="scss" scoped>
.el-card {
  padding-top: $base-ratio-px * 2;
}
</style>
