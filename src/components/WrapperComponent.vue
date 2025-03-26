<script setup lang="ts"></script>

<template>
  <div class="item">
    <div class="header">
      <slot name="header"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style scoped>
.item {
  margin-top: 1rem;
}

.header {
  font-size: x-large;
  font-weight: 600;
  border-bottom: 1px solid #e7e5e4;
}

.content {
  width: 100%;
}
</style>
