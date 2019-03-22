<template>
  <div>
    <el-container class="home-container">
      <el-header class="home-header">
        <span class="home_title">我的平台</span>
      </el-header>
      <el-container>
        <el-aside width="180px" class="home-aside">
          <div style="display: flex;justify-content: flex-start;width: 180px;text-align: left;">
            <el-menu style="background: #545c64;width: 180px;" unique-opened>
                <el-menu-item index="1" @click="goTodayFundJson">
                  <i class="el-icon-menu"></i>
                  <span slot="title">今日配置</span>
                </el-menu-item>
                <el-menu-item index="2" @click="goFundList">
                  <i class="el-icon-menu"></i>
                  <span slot="title">基金列表</span>
                </el-menu-item>
                <el-menu-item index="3">
                  <i class="el-icon-menu"></i>
                  <span slot="title">导航三</span>
                </el-menu-item>
            </el-menu>
          </div>
        </el-aside>
          <el-main>
            <el-breadcrumb separator-class="el-icon-arrow-right">
              <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
              <el-breadcrumb-item v-text="this.$router.currentRoute.name"></el-breadcrumb-item>
            </el-breadcrumb>
            <keep-alive>
              <router-view v-if="this.$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!this.$route.meta.keepAlive"></router-view>
          </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        
      }
    },
    methods:{
      goFundList(){
        this.$router.push({path: '/fundlist'});
      },
      goTodayFundJson(){
        this.$router.push({path: '/todayFundJson'});
      }
    }
  }
</script>

<style>
  .home-container {
    height: 100%;
    position: absolute;
    top: 0px;
    left: 0px;
    width: 100%;
  }

  .home-header {
    background-color: #545c64;
    color: #fff;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-sizing: content-box;
    padding: 0px;
  }

  .home-aside {
    background-color: #545c64;
  }

  .el-submenu__title{
    color: #000;
  }

  .home-main {
    background-color: #fff;
    color: #000;
    text-align: center;
    margin: 0px;
    padding: 0px;;
  }

  .home_title {
    color: #fff;
    font-size: 22px;
    display: inline;
    margin-left: 8px;
  }

  .home_userinfo {
    color: #fff;
    cursor: pointer;
  }

  .home_userinfoContainer {
    display: inline;
    margin-right: 20px;
  }

  .el-submenu .el-menu-item {
    width: 180px;
    min-width: 175px;
  }
</style>
