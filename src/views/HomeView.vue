<script setup lang="ts">
import { useToast } from 'vue-toastification'
import WrapperComponent from '@/components/WrapperComponent.vue'
import { X } from 'lucide-vue-next'
import DeleteModal from '@/components/DeleteModal.vue'
import FormComponent from '@/components/FormComponent.vue'
import { useStore } from '@/composable/useStore'
import { ref } from 'vue'

const toast = useToast()
const openModal = ref(false)
const itemId = ref<null | string>(null)

const { history, addItem, removeItem, calculatedBalance, calculatedIncome, calculatedExpense } =
  useStore()

const deleteItem = (id: string) => {
  const item = removeItem(id)

  if (item === null) {
    toast.error('Item does not found!')
  } else {
    toast.success(`${item} has been deleted!`)
  }
  openModal.value = false
  itemId.value = ''
}

const handleOpenModalClick = (id: string) => {
  openModal.value = true
  itemId.value = id
}

const handleCloseModalClick = () => {
  openModal.value = false
  itemId.value = ''
}

const formSubmit = (id: string, name: string, amount: number) => {
  addItem(id, name, amount)
  toast.success(`${name} has been added!`)
}
</script>

<template>
  <div class="home-view">
    <h1>Balance</h1>
    <span class="balance"
      >{{ calculatedBalance < 0 ? '-' : '' }}${{ Math.abs(calculatedBalance) }}</span
    >
    <div>
      <div class="income-expense-wrapper">
        <div class="income">
          <p>Income</p>
          <span>{{ calculatedIncome > 0 ? '+' : '' }}${{ calculatedIncome }}</span>
        </div>
        <div class="separator"></div>
        <div class="expense">
          <p>Expense</p>
          <span>{{ calculatedExpense < 0 ? '-' : '' }}${{ Math.abs(calculatedExpense) }}</span>
        </div>
      </div>
      <WrapperComponent>
        <template #header>
          <p>History</p>
        </template>
        <template #content>
          <p v-if="history.length === 0" class="history-list-empty">History data is empty.</p>
          <TransitionGroup v-if="history.length > 0" name="history-list" tag="ul">
            <li v-for="item in history" :key="item.id" class="history-item">
              <div>{{ item.name }}</div>
              <div :class="item.amount < 0 ? 'history-expense' : 'history-income'">
                {{ item.amount < 0 ? '-' : '+' }}${{ Math.abs(item.amount) }}
              </div>
              <button id="delete-btn" @click="handleOpenModalClick(item.id)"><X /></button>
            </li>
          </TransitionGroup>
        </template>
      </WrapperComponent>
      <Teleport to="body">
        <div v-if="openModal && itemId !== null">
          <DeleteModal :id="itemId" @close="handleCloseModalClick" @delete="deleteItem" /></div
      ></Teleport>
      <WrapperComponent>
        <template #header>
          <p>New Transaction</p>
        </template>
        <template #content>
          <FormComponent @form-submit="formSubmit" />
        </template>
      </WrapperComponent>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-size: x-large;
  font-weight: 600;
}

.balance {
  font-size: xx-large;
  font-weight: 800;
  color: #57534e;
}

.income-expense-wrapper {
  display: flex;
  flex-direction: row;
  border: 1px solid #e7e5e4;
  background-color: #f5f5f4;
}

.income,
.expense {
  font-weight: 800;
  font-size: x-large;
  padding: 1rem 2rem;
}

.income span {
  font-weight: 600;
  color: var(--color-green);
}

.expense span {
  font-weight: 760;
  color: var(--color-rose);
}

.separator {
  width: 1px;
  background-color: #e7e5e4;
  margin: 1rem 0;
}

.history-list-empty {
  color: #a1a1aa;
  padding: 0.25rem 0;
}

ul {
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
  list-style-type: none;
}

ul > * + * {
  margin-top: 0.25rem;
}

.history-list-enter-active,
.history-list-leave-active {
  transition: all 0.5s ease;
}
.history-list-enter-from,
.history-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.history-item {
  display: flex;
  flex-direction: row;
  align-items: center;
  position: relative;

  &:hover {
    background-color: #f5f5f4;
  }
}

.history-item:hover button {
  background-color: transparent;
}

.history-income {
  font-weight: 600;
  color: var(--color-green);
}

.history-expense {
  font-weight: 600;
  color: var(--color-rose);
}

.history-item div:nth-child(1) {
  width: 70%;
}

.history-item div:nth-child(2) {
  width: 30%;
  text-align: right;
  margin-right: 5px;
}

#delete-btn {
  padding: 5px;
  width: 30px;
  height: 30px;
  visibility: hidden;
  position: absolute;
  right: -30px;

  &:hover {
    color: var(--color-rose);
  }
}

.history-item:hover #delete-btn {
  visibility: visible;
}
</style>
