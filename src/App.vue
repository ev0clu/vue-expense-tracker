<script setup lang="ts">
import { RouterView } from 'vue-router'
import HeaderComponent from './components/HeaderComponent.vue'
import FooterComponent from './components/FooterComponent.vue'
</script>

<template>
  <HeaderComponent />

  <main>
    <RouterView />
  </main>

  <FooterComponent />
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  /*  flex: 1 1 0%; */
  flex-grow: 1;
  align-items: center;
}
</style>
