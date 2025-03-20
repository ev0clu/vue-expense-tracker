<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div>
      <RouterLink to="/"
        ><img alt="App Logo" src="@/assets/logo.png" width="30" height="30"
      /></RouterLink>

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/chart">Chart</RouterLink>
      </nav>
    </div>
  </header>
</template>

<style scoped>
header {
  line-height: 1.5;
  backdrop-filter: blur(10px);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 2rem;
  z-index: 10;
  border-bottom: 1px solid var(--color-background-mute);
}

header > div {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

nav {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}

nav > a {
  font-weight: 600;
  font-size: medium;
  padding: 0.25rem 0.5rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

@media (min-width: 640px) {
  header {
    padding: 0.5rem 4rem;
  }

  nav {
    gap: 1rem;
  }

  nav > a {
    padding: 0.5rem 1rem;
  }
}
</style>
