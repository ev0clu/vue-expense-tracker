<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date().getFullYear())
</script>

<template>
  <footer>
    <p>Copyright © Laszlo Kis {{ date }}</p>
    <a href="https://github.com/ev0clu" target="_blank" rel="noreferrer">
      <img alt="Github Logo" src="@/assets/github-mark.svg" width="20" height="20" />
    </a>
  </footer>
</template>

<style scoped>
footer {
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 0.5rem;
  padding: 0.75 2rem; /* 12px 32px */
  margin-top: 3.5rem; /* 56px */
  width: 100%;
}

footer > a {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem; /* 20px */
  line-height: 1.75rem; /* 28px */
  color: #6b7280;

  &:hover {
    color: #a3a3a3;
  }
}

img {
  border-radius: 9999px;
}

img:hover {
  opacity: 0.6;
}
</style>
