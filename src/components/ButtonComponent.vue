<script setup lang="ts">
defineProps<{
  variant: 'default' | 'destructive' | 'outline'
  argument?: string | number
}>()
defineEmits<{
  (e: 'buttonNormalClick'): void
  (e: 'buttonEventClick', argument: string | number): void
}>()
</script>

<template>
  <button
    :class="[
      { default: variant === 'default' },
      { destructive: variant === 'destructive' },
      { outline: variant === 'outline' },
    ]"
    @click="
      argument !== undefined ? $emit('buttonEventClick', argument) : $emit('buttonNormalClick')
    "
  >
    <slot></slot>
  </button>
</template>

<style scoped>
button {
  border: 1px solid #e7e5e4;
  padding: 0.2rem 0.8rem;
}

.default {
  background-color: var(--color-green);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-green-mute);
  }
}

.destructive {
  background-color: var(--color-rose);
  color: var(--color-white);

  &:hover {
    background-color: var(--color-rose-mute);
  }
}

.outline:hover {
  background-color: var(--color-white-mute);
}
</style>
