<template>
  <div class="auth">
    <!-- <div class="dg"></div> -->
    <div class="title-info">
      <img src="" alt="">
      <div class="title">Login</div>
    </div>

    <div class="form">
      <a-tabs>
      <a-tab-pane size="large" tab="登入" key="1">

        <div class="item">
         <a-input size="large" placeholder="账户" >
          <template #prefix>
        <UserOutlined />
          </template>
        </a-input>
        </div>

        <div class="item">
         <a-input size="large" placeholder="密码" > 
         <template #prefix>
        <LockOutlined />
          </template>
        </a-input>        
        </div>

        <div class="item">
         <a href="">忘记密码</a>        
        </div>

        <div class="item">
          <a-button size="large" type="primary">
            登入
          </a-button>
        </div>
      </a-tab-pane>


      <a-tab-pane size="large" tab="注册" key="2">
        <div class="item">
         <a-input size="large" placeholder="账户" >
          <template #prefix>
        <UserOutlined />
          </template>
        </a-input>
        </div>

        <div class="item">
         <a-input size="large" placeholder="密码" > 
         <template #prefix>
        <LockOutlined />
          </template>
        </a-input>        
        </div>

        <div class="item">
         <a-input size="large" placeholder="邀请码" > 
         <template #prefix>
        <MailOutlined /> 
          </template>
        </a-input>        
        </div>

        <div class="item">
          <a-button size="large" type="primary">
            注册
          </a-button>
        </div>
      </a-tab-pane>
    </a-tabs>

    </div>
  </div>
</template>

<script src="./index.js"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>