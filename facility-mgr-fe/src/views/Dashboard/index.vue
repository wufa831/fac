<template>
  <div>
    <a-spin :spinning="loading">
      <a-card>
        <div class="list">
          <div class="item">
            <div class="count">共{{baseInfo.total.facility}}台</div>
            <div class="title">门磁设备</div>
          </div>
          <div class="item">
            <div class="count">共{{baseInfo.total.user}}位</div>
            <div class="title">用户</div>
          </div>
          <div class="item">
            <div class="count">共{{baseInfo.total.log}}条</div>
            <div class="title">日志</div>
          </div>
        </div>
      </a-card>

    </a-spin>

  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>
