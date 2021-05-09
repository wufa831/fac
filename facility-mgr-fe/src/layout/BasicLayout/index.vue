<template>
  <div class="basic-layout">
    <div class="app-header">
      <div class="left1">
        <div class="title">
          门磁设备管理系统
        </div>
      </div>
      <div class="right1">
        <div class="hello-msg">
          你好，{{ store.userInfo.account }}
        </div>
        <div class="logout" @click="logout">退出</div>
      </div>
    </div>
    <div class="app-header-placeholder"></div>
    <div class="app-content">
      <div class="left2">
        <app-nav/>
        <!-- AppNav转换小写通过- -->
      </div>
      <div class="right2">
        <router-view/>
        <!-- 根据路由把页面渲染上去 -->
      </div>
      
    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
 @import './index.scss';
</style>