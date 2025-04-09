<script setup lang="ts">
import { ref } from 'vue'
import ButtonComponent from './ButtonComponent.vue'
import type { FormError } from '@/types'

const emits = defineEmits<{
  formSubmit: [id: string, name: string, amount: number]
}>()

const error = ref<FormError | ''>('')
const title = ref('')
const amount = ref<null | number>(null)

function formSubmitHandler() {
  if (title.value.trim().length <= 3) {
    error.value = 'title'
  } else if (typeof amount.value !== 'number' || amount.value === 0 || amount.value === null) {
    error.value = 'amount'
  } else {
    emits('formSubmit', crypto.randomUUID(), title.value, amount.value)
    title.value = ''
    amount.value = null
    error.value = ''
  }
}
</script>

<template>
  <form @submit.prevent="formSubmitHandler">
    <div class="title">
      <label for="title">Title</label>
      <input type="text" v-model="title" placeholder="Title" name="title" @input="error = ''" />
      <span class="error" v-if="error === 'title'">Title need to be more than 3 characters</span>
    </div>
    <div class="amount">
      <label for="amount">Amount</label>
      <input type="number" v-model="amount" placeholder="100" name="amount" @input="error = ''" />
      <span class="error" v-if="error === 'amount'">Invalid amount!</span>
    </div>
    <div class="btn-container">
      <ButtonComponent variant="default">Submit</ButtonComponent>
    </div>
  </form>
</template>

<style scoped>
form {
  margin-top: 0.5rem;
}

form > * + * {
  margin-top: 0.5rem;
}

div {
  display: flex;
  flex-direction: column;
}

label {
  font-weight: 600;
}

input {
  padding: 0.5rem 1rem;
}

.btn-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.error {
  color: var(--color-rose);
}
</style>
