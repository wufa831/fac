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
         <a-input
          size="large"
          placeholder="账户"
          v-model:value="loginForm.account" 
         >
          <template #prefix>
        <UserOutlined />
          </template>
        </a-input>
        </div>

        <div class="item">
         <a-input
          size="large" 
          placeholder="密码" 
          v-model:value="loginForm.password" 
         > 
         <template #prefix>
        <LockOutlined />
          </template>
        </a-input>        
        </div>

        <div class="item">
         <a href="javascript:;" @click="forgetPassword">忘记密码</a>        
        </div>

        <div class="item">
          <a-button 
           size="large" 
           type="primary"
           @click="login"
          >
            登入
          </a-button>
        </div>
      </a-tab-pane>


      <a-tab-pane size="large" tab="注册" key="2">
        <div class="item">
         <a-input 
          size="large" 
          placeholder="账户"
          v-model:value="regForm.account"
         >
          <template #prefix>
        <UserOutlined />
          </template>
        </a-input>
        </div>

        <div class="item">
         <a-input
          size="large"
          placeholder="密码" 
          v-model:value="regForm.password"  
          > 
         <template #prefix>
        <LockOutlined />
          </template>
        </a-input>        
        </div>

        <div class="item">
         <a-input
          size="large" 
          placeholder="邀请码" 
          v-model:value="regForm.inviteCode"
         > 
         <template #prefix>
        <MailOutlined /> 
          </template>
        </a-input>        
        </div>

        <div class="item">
          <a-button 
            @click="register"
            size="large" 
            type="primary"
          >
            注册
          </a-button>
        </div>
      </a-tab-pane>
    </a-tabs>

    </div>
  </div>
</template>

<script src="./index.jsx"></script>

<style lang="scss" scoped>
  @import './index.scss';
</style>