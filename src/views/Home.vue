<template>
  <el-container>
    <el-container class="el-body">
      <el-aside width="10vw" :style="{height: sideBarHeight}">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          active-text-color="#409eff"
          background-color="#304156"
          text-color="#bfcbd9"
          router
        >
          <el-menu-item @click="setPathAndName('/DashBoard', '深度学习')" index="/DashBoard">
            <span class="svg-container">
              <svg-icon icon-class="tree"></svg-icon>
            </span>
            <span slot="title">深度学习</span>
          </el-menu-item>
          <el-menu-item @click="setPathAndName('/Order', '目管理')" index="/Order">
            <span class="svg-container">
              <svg-icon icon-class="form"></svg-icon>
            </span>
            <span slot="title">目管理</span>
          </el-menu-item>
          <el-menu-item @click="setPathAndName('/Family', '科管理')" index="/Family">
            <span class="svg-container">
              <svg-icon icon-class="nested"></svg-icon>
            </span>
            <span slot="title">科管理</span>
          </el-menu-item>
          <el-menu-item @click="setPathAndName('/Genus', '属管理')" index="/Genus">
            <span class="svg-container">
              <svg-icon icon-class="dashboard"></svg-icon>
            </span>
            <span slot="title">属管理</span>
          </el-menu-item>
          <el-menu-item @click="setPathAndName('/Species', '种管理')" index="/Species">
            <span class="svg-container">
              <svg-icon icon-class="table"></svg-icon>
            </span>
            <span slot="title">种管理</span>
          </el-menu-item>
        </el-menu>
        <div style="position: absolute;top: 80%;left: 3%; width: 4%">
            <el-tag type="primary" class="user">
              用户：{{ username }}
            </el-tag>
            <div style="margin: 10px"></div>
            <el-button
              type="danger"
              style="position:relative;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);width: 160%"
              @click="logout">
              登出
            </el-button>
        </div>
      </el-aside>
      <el-main>
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: path }">{{ name }}</el-breadcrumb-item>
        </el-breadcrumb>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import networkUtils from '@/utils/networkUtils';

export default {
  name: 'Home',
  components: {},
  data() {
    return {
      path: '',
      name: '',
      username: networkUtils.username.getUsername(),
      sideBarHeight: '100vh',
    };
  },
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    setPathAndName(path, name) {
      this.path = path;
      this.name = name;
    },
    logout() {
      networkUtils.token.removeToken();
      this.$router.push({
        path: '/Login',
      }).catch(() => {});
    },
  },
};
</script>

<style lang="scss" scoped>

.el-body {
  height: 90vh;
}

.title {
  font-size: 35px;
}

.el-aside {
  background-color: #304156;
  overflow: hidden;
}

.el-main {
  overflow-x: hidden;
}

.svg-container {
  padding: 6px 5px 6px 5px;
  vertical-align: middle;
  width: 18px;
  display: inline-block;
}

.user {
  font-size: 18px;
  font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
  position:relative;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%);
}
</style>
