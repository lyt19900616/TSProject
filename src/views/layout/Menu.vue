<template>
  <div class="menu-box">
    <div class="logo">
      <img src="~@/assets/img/lyt.png" alt="logo" />
      <span v-if="!collapse">Vue3+TS</span>
    </div>
    <el-menu
      :default-active="activeIndex"
      @select="menuChange"
      router
      :collapse="collapse"
      background-color="#6A5ACD"
      text-color="#f3f3f3"
      active-text-color="#faad13"
      >
      <el-submenu v-for="item in menus" :key="item.id" :index="item.url">
        <template #title>
          <i :class="item.icon"></i>
          <span>{{item.name}}</span>
        </template>
        <el-menu-item v-for="subItem in item.children" :key="subItem.id" :index="subItem.url">{{subItem.name}}</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from 'vuex'

export default defineComponent({
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    const store = useStore()
    const menus = computed(() => store.state.login.userMenus)
    const activeIndex = menus.value[0].children[0].url
    const menuChange = (val:any) => {
      console.log(val)
    }
    return {
      menus,
      activeIndex,
      menuChange
    }
  }
})
</script>

<style lang="less" scoped>
@import '~@/styles/index.less';
.menu-box {
  width: 100%;
  height: 100%;
  background-color: #6A5ACD;
  .logo {
    display: flex;
    padding: 10px 0;
    justify-content: flex-start;
    align-items: center;
    img {
      width: 60px;
    }
    span {
      font-size: 16px;
      font-weight: 700;
      color: @main-text;
    }
  }
}
.el-menu {
  border-right: none;
}
</style>
