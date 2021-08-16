<template>
  <div class="account">
    <el-form :model="phoneForm" :rules="phoneRules" ref="formRef">
      <el-form-item label="手机号:" prop="phone">
        <el-input
          type="tel"
          v-model="phoneForm.phone"
          :maxlength="11"
          @input="inputChange"
        ></el-input>
      </el-form-item>
      <div class="inline-box">
        <el-form-item label="验证码:" prop="code">
          <el-input
            type="tel"
            v-model="phoneForm.code"
            :maxlength="6"
          ></el-input>
        </el-form-item>
        <el-button
          class="btn"
          :disabled="codeBtn.disable"
          :class="{ codeGeting: codeBtn.isGeting }"
          @click="getVerifyCode"
        >
          {{ codeBtn.title }}
        </el-button>
      </div>
    </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { phoneRules } from '../rules'
import { ElForm, ElMessage } from 'element-plus'
import * as lodash from 'lodash'

export default defineComponent({
  setup() {
    const formRef = ref<InstanceType<typeof ElForm>>()
    const phoneForm = reactive({
      phone: '',
      code: ''
    })
    const codeBtn = reactive({
      title: '获取验证码',
      isGeting: false,
      count: 60,
      disable: true
    })
    const getVerifyCode = () => {
      const timer = setInterval(() => {
        if (codeBtn.count < 1) {
          codeBtn.isGeting = false
          codeBtn.disable = false
          codeBtn.title = '获取验证码'
          codeBtn.count = 60
          clearInterval(timer)
        } else {
          codeBtn.isGeting = true
          codeBtn.disable = true
          codeBtn.title = codeBtn.count-- + 's后重发'
        }
      }, 1000)
    }
    const inputChange = lodash.debounce((val: string) => {
      const reg = /^1(3|4|5|6|7|8|9)\d{9}$/
      if (reg.test(val)) {
        codeBtn.disable = false
      } else {
        codeBtn.disable = true
      }
    }, 500)
    const phoneLogin = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          ElMessage('手机登录功能暂不支持')
        }
      })
    }
    return {
      formRef,
      codeBtn,
      getVerifyCode,
      inputChange,
      phoneForm,
      phoneRules,
      phoneLogin
    }
  }
})
</script>

<style lang="less" scoped>
.inline-box {
  display: flex;
  .btn {
    height: 40px;
    margin-left: 8px;
  }
  .codeGeting {
    background: #cdcdcd;
    border-color: #cdcdcd;
    color: #fff;
  }
}
</style>
