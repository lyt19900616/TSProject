<template>
  <div class="layout-box">
    <el-container class="main-content">
      <el-aside :width="isCollapse ? '60px' : '210px'">
        <Menu :collapse="isCollapse"></Menu>
      </el-aside>
      <el-container class="page">
        <el-header class="page-header">
          <Header @foldChange="handleFoldChange"></Header>
        </el-header>
        <el-main class="page-content">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import Menu from './Menu.vue'
import Header from './Header.vue'
export default defineComponent({
  components: {
    Menu,
    Header
  },
  setup () {
    const isCollapse = ref(false)
    const handleFoldChange = (isFold: boolean) => {
        isCollapse.value = isFold
      }
    return {
      isCollapse,
      handleFoldChange
    }
  }
})
</script>

<style lang="less" scoped>
.layout-box {
  width: 100%;
  height: 100%;
  .main-content {
    width: 100%;
    height: 100%;
    .page {
      width: 100%;
      height: 100%;
      .page-header {
        height: 48px;
      }
    }
    .el-aside {
      transition: width 0.5s;
      -webkit-transition: width 0.5s;
      -moz-transition: width 0.5s;
      -webkit-transition: width 0.5s;
      -o-transition: width 0.5s;
      scrollbar-width: none; /* firefox */
      -ms-overflow-style: none; /* IE 10+ */
      &::-webkit-scrollbar {
        display: none;
      }
    }
  }
}
</style>
