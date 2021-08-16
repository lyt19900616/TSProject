<template>
  <div class="login">
    <div class="login-box">
      <h2>VUE3+TS项目</h2>
      <el-tabs type="border-card" stretch v-model="tabName">
        <el-tab-pane name="account" label="账号登录">
          <account ref="accountRef"></account>
        </el-tab-pane>
        <el-tab-pane name="phone" label="快速登录">
          <phone ref="phoneRef"></phone>
        </el-tab-pane>
      </el-tabs>
      <el-button type="primary" :loading="isLogin" @click="login" class="login-btn">
        {{ isLogin ? '正在登录' : '登录' }}
      </el-button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import Account from './components/Account.vue'
import Phone from './components/Phone.vue'

export default defineComponent({
  components: {
    Account,
    Phone
  },
  setup() {
    const store = useStore()
    // 是否在登录
    const isLogin = computed(() => store.state.login.isLogin)
    const tabName = ref('account')
    // 绑定组件
    const accountRef = ref<InstanceType<typeof Account>>()
    const phoneRef = ref<InstanceType<typeof Phone>>()
    const login = () => {
      if (tabName.value === 'account') {
        accountRef.value?.loginAction()
      } else {
        phoneRef.value?.phoneLogin()
      }
    }
    return {
      isLogin,
      accountRef,
      phoneRef,
      tabName,
      login
    }
  }
})
</script>

<style lang="less" scoped>
.login {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: url('../../assets/img/login-bg.svg');
  .login-box {
    width: 30%;
    h2 {
      text-align: center;
    }
    .login-btn {
      margin-top: 20px;
      width: 100%;
    }
  }
}
</style>
