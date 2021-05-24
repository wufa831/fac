<template>
  <div>    
    <a-menu
    style="width: 217px"
    v-model:openKeys="openKeys"
    v-model:selectedKeys="selectedKeys"
    mode="inline"
    v-for="(item) in menu" 
    :key="item.url"
    v-only-super-admin="item.onlySuperAdmin"
    v-only-admin="item.onlyAdmin"
    >
      <!-- v-only-admin="item.onlyAdmin" -->
    <!-- v-only-superadmin="item.onlySuperAdmin" -->
      <a-sub-menu 
      v-if="item.children"
      >
        <template #title>
            <span>{{item.title}}</span>
        </template>
          <a-menu-item
          @click="to(child.url)"
          v-for="(child) in item.children"
          :key="child.url"
        >
          {{ child.title }}
        </a-menu-item>
      </a-sub-menu>
      <a-menu-item @click="to(item.url)" :key="item.url" v-else>
        {{item.title}}
      </a-menu-item>
  </a-menu>
  </div>
</template>


<script src="./index.js"></script>