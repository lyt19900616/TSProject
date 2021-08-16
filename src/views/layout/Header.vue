<template>
  <div class="header-box">
    <i
      class="fold-menu"
      :class="isFold ? 'el-icon-s-fold' : 'el-icon-s-unfold'"
      @click="handleFoldClick"
    ></i>
    <div>面包屑</div>
    <el-dropdown>
      <span class="avatar-box">
        <img  src="~@/assets/img/lyt.png" alt="">
        <span>{{name}}</span>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">切换账号</el-dropdown-item>
          <el-dropdown-item @click="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import storage from '@/utils/storage'

export default defineComponent({
  emits: ['foldChange'],
  setup (props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      emit('foldChange', isFold.value)
    }
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    const router = useRouter()
    const logout = () => {
      storage.localClear()
      router.replace('/login')
    }

    return {
      isFold,
      handleFoldClick,
      name,
      logout
    }
  }
})
</script>

<style lang="less" scoped>
.header-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .fold-menu {
    font-size: 30px;
    cursor: pointer;
  }
  .avatar-box {
    display: flex;
    align-items: center;
    img {
      width: 48px;
      height: 48px;
    }
    span {
      font-size: 1rem;
      font-weight: bold;
    }
  }
}
</style>
