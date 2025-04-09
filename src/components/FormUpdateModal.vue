<script setup lang="ts">
import type { FormError, History } from '@/types'
import ButtonComponent from './ButtonComponent.vue'
import { ref } from 'vue'

const props = defineProps<{
  id: string
  history: History | undefined
}>()
const emits = defineEmits<{
  close: []
  formSubmit: [id: string, name: string, amount: number]
}>()

const error = ref<FormError | ''>('')
const title = ref<string>(props.history?.name ?? '')
const amount = ref<null | number>(props.history?.amount ?? null)

function closeButtonHandler() {
  emits('close')
}

function formSubmitHandler() {
  if (title.value.trim().length <= 3) {
    error.value = 'title'
  } else if (typeof amount.value !== 'number' || amount.value === 0 || amount.value === null) {
    error.value = 'amount'
  } else {
    emits('formSubmit', props.id, title.value, amount.value)
    title.value = ''
    amount.value = null
    error.value = ''
  }
}
</script>

<template>
  <div class="modal-backdrop" @click.self="closeButtonHandler">
    <div class="delete-modal">
      <form @submit.prevent="formSubmitHandler">
        <div class="title">
          <label for="title">Title</label>
          <input type="text" v-model="title" placeholder="Title" name="title" @input="error = ''" />
          <span class="error" v-if="error === 'title'"
            >Title need to be more than 3 characters</span
          >
        </div>
        <div class="amount">
          <label for="amount">Amount</label>
          <input
            type="number"
            v-model="amount"
            placeholder="100"
            name="amount"
            @input="error = ''"
          />
          <span class="error" v-if="error === 'amount'">Invalid amount!</span>
        </div>
        <div class="btn-container">
          <ButtonComponent variant="outline" @button-normal-click="closeButtonHandler">
            Cancel
          </ButtonComponent>
          <ButtonComponent variant="default">Update</ButtonComponent>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(5px);
  width: 100vw;
  height: 100vh;
  z-index: 15;
}
.delete-modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
  z-index: 16;
  padding: 1rem;
  border-radius: 8px;
}

.delete-modal > * + * {
  margin-top: 1rem;
}

.button-wrapper {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

button.hover {
  background-color: blue;
}

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
