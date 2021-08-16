<template>
  <div class="account">
    <el-form :model="accountForm" :rules="accountRules" ref="formRef">
      <el-form-item label="账号:" prop="account">
        <el-input type="text" v-model="accountForm.account"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="pwd">
        <el-input type="text" show-password v-model="accountForm.pwd"></el-input>
      </el-form-item>
    </el-form>
    <el-checkbox class="checkbox" v-model="isRemember">记住密码</el-checkbox>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { useStore } from 'vuex'
import { ElForm } from 'element-plus'
import { accountRules } from '../rules'
import storage from '@/utils/storage'
import AesManager from '@/utils/aes-manager'

export default defineComponent({
  setup() {
    const store = useStore()
    const accountForm = reactive({
      account: storage.localGet('userName') ? AesManager.decrypt(storage.localGet('userName')) : '',
      pwd: storage.localGet('pwd') ? AesManager.decrypt(storage.localGet('pwd')) : ''
    })
    const isRemember = ref(true)
    const formRef = ref<InstanceType<typeof ElForm>>()
    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          if (isRemember.value) {
            storage.localSet('userName', AesManager.encrypt(accountForm.account))
            storage.localSet('pwd', AesManager.encrypt(accountForm.pwd))
          } else {
            storage.localRemove('userName')
            storage.localRemove('pwd')
          }
          store.commit('login/updateIsLogin', true)
          store.dispatch('login/loginAction', { ...accountForm })
        } else {
          store.commit('login/updateIsLogin', false)
        }
      })
    }
    return {
      accountForm,
      isRemember,
      loginAction,
      formRef,
      accountRules
    }
  }
})
</script>

<style scoped>
.checkbox {
  padding: 4px 10px;
}
</style>
