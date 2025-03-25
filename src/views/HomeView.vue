<script setup lang="ts">
import { computed, ref } from 'vue'
import WrapperComponent from '@/components/WrapperComponent.vue'
import { X } from 'lucide-vue-next'
import DeleteModal from '@/components/DeleteModal.vue'

const openModal = ref(false)
const itemId = ref<null | number>(null)
const income = ref(10)
const expense = ref(-10)
const history = ref([
  { id: 1, name: 'shopping', amount: -15 },
  { id: 2, name: 'selling', amount: 100 },
  { id: 3, name: 'car', amount: 30 },
])

const deleteItem = (index: number) => {
  history.value.splice(index, 1)
  openModal.value = false
}

const handleOpenModalClick = (id: number) => {
  openModal.value = true
  itemId.value = id
}

const calculateBalance = computed(() => history.value.reduce((acc, curr) => acc + curr.amount, 0))
</script>

<template>
  <div class="home-view">
    <h1>Balance</h1>
    <span class="balance"
      >{{ calculateBalance < 0 ? '-' : '' }}${{ Math.abs(calculateBalance) }}</span
    >
    <div>
      <div class="income-expense-wrapper">
        <div class="income">
          <p>Income</p>
          <span>{{ income > 0 ? '+' : '' }}${{ income }}</span>
        </div>
        <div class="separator"></div>
        <div class="expense">
          <p>Expense</p>
          <span>{{ expense < 0 ? '-' : '' }}${{ Math.abs(expense) }}</span>
        </div>
      </div>
      <WrapperComponent>
        <template #header>
          <p>History</p>
        </template>
        <template #content>
          <ul>
            <li v-for="(item, index) in history" :key="item.id" class="history-item">
              <div>{{ item.name }}</div>
              <div :class="item.amount < 0 ? 'history-expense' : 'history-income'">
                {{ item.amount < 0 ? '-' : '+' }}${{ Math.abs(item.amount) }}
              </div>
              <button id="delete-btn" @click="handleOpenModalClick(index)"><X /></button>
            </li>
          </ul>
        </template>
      </WrapperComponent>
      <Teleport to="body">
        <div v-if="openModal && itemId !== null">
          <DeleteModal :id="itemId" @close="openModal = false" @delete="deleteItem" /></div
      ></Teleport>
      <WrapperComponent>
        <template #header>
          <p>New Transaction</p>
        </template>
        <template #content>
          <p>atfft</p>
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

ul {
  padding: 0;
  margin: 0.5rem 0;
  width: 100%;
  list-style-type: none;
}

ul > * + * {
  margin-top: 0.25rem;
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
