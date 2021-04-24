<template>
  <el-container>
    <el-container class="el-body">
      <el-aside width="200px">
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
        <el-tag type="success" class="user">用户：{{ username }}</el-tag>
        <el-button
          type="danger"
          @click="logout"
          style="
          position: relative;
          top: 55%;
          width: 70%;
          left: 30px;">
          登出
        </el-button>
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
  height: 90%;
}

.title {
  font-size: 35px;
}

.el-aside {
  background-color: #304156;
  height: 100vh;
  overflow: hidden;
}

.el-main {
  overflow: hidden;
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
  position: relative;
  top: 52%;
  width: 70%;
  margin-left: 30px;
  margin-right: auto;
}
</style>
